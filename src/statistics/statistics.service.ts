import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVideoGame } from 'src/video-games/entities/user-videogames.entity';
import { VideoGame } from 'src/video-games/entities/video-game.entity';
import { Repository } from 'typeorm';
import { buildStartEndDate } from 'src/utils/date.utils';

export interface YearSalesData {
  sales: UserVideoGame[];
  count: number;
  profit: number;
}

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(VideoGame)
    private readonly videoGameRepository: Repository<VideoGame>,
    @InjectRepository(UserVideoGame)
    private readonly userVideoGameRepository: Repository<UserVideoGame>,
  ) {}

  async getStatistics(month: string, year: string, developerId?: number) {
    return {
      yearSales: {
        currentYearSales: await this.getAllSales(year, undefined, developerId),
        prevYearSales: await this.getAllSales(
          String(Number(year) - 1),
          undefined,
          developerId,
        ),
        bestWorstSellingGames: await this.getBestAndWorstSellingGames(
          year,
          undefined,
          developerId,
        ),
      },
      monthSales: {
        currentMonthSales: await this.getAllSales(year, month, developerId),
        prevMonthSales: await this.getAllSales(
          year,
          String(Number(month) - 1),
          developerId,
        ),
        bestWorstSellingGames: await this.getBestAndWorstSellingGames(
          year,
          month,
          developerId,
        ),
      },
      totalVideoGames: await this.getTotalVideoGames(developerId),
    };
  }

  /**
   * Retrieves the best and worst-selling video games for a given month and year.
   * Optionally filters the results by a specific developer.
   *
   * @param year - The year for which to retrieve sales data (e.g., "2023").
   * @param month - (Optional) The month for which to retrieve sales data (e.g., "01" for January).
   * @param developerId - (Optional) The ID of the developer to filter the results by.
   * @returns An object containing the most sold video game (`mostSoldVideoGame`)
   *          and the least sold video game (`leastSoldVideoGame`) within the specified time range.
   *          Each game includes its title (`titulo`), slug (`slug`), and the number of sales (`sales`).
   * @throws Will throw an error if the query fails or if the date range is invalid.
   */
  private async getBestAndWorstSellingGames(
    year: string,
    month?: string,
    developerId?: number,
  ) {
    const { startDate, endDate } = buildStartEndDate(year, month);

    const soldVideoGamesQuery = this.videoGameRepository
      .createQueryBuilder('videoGame')
      .select('videoGame.titulo', 'titulo')
      .addSelect('videoGame.slug', 'slug')
      .addSelect('COUNT(userVideoGame.id)::int', 'sales')
      .leftJoin(
        'videoGame.userVideoGames',
        'userVideoGame',
        'userVideoGame.fechaCompra BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );

    if (developerId) {
      soldVideoGamesQuery.leftJoin('videoGame.developer', 'developer');
      soldVideoGamesQuery.andWhere('developer.id = :developerId', {
        developerId,
      });
    }

    try {
      const soldVideoGames = await soldVideoGamesQuery
        .groupBy('videoGame.titulo')
        .addGroupBy('videoGame.slug')
        .orderBy('sales', 'DESC')
        .addOrderBy('videoGame.titulo', 'ASC')
        .getRawMany();

      return {
        mostSoldVideoGame: soldVideoGames[0],
        leastSoldVideoGame: soldVideoGames[soldVideoGames.length - 1],
      };
    } catch (error) {
      console.error('Error fetching best and worst selling games:', error);
      throw new InternalServerErrorException(
        'Error fetching best and worst selling games. Please try again later.',
      );
    }
  }

  /**
   * Retrieves all sales data for a given year, with optional filtering by month and developer ID.
   *
   * @param year - The year for which sales data is to be retrieved.
   * @param month - (Optional) The specific month within the year to filter sales data.
   * @param developerId - (Optional) The ID of the developer to filter sales data by.
   * @returns A promise that resolves to an object containing:
   *          - `sales`: An array of sales data, including profit, purchase date, and ID.
   *          - `count`: The total number of sales records retrieved.
   *          - `profit`: The total profit calculated from the sales.
   */
  private async getAllSales(
    year: string,
    month?: string,
    developerId?: number,
  ): Promise<YearSalesData> {
    const { startDate, endDate } = buildStartEndDate(year, month);
    const profitMultiplier = developerId ? 0.9 : 0.1;
    const salesBy = month ? 'day' : 'month';
    const salesDataQuery = this.userVideoGameRepository
      .createQueryBuilder('userVideoGame')
      .select('EXTRACT(' + salesBy + ' FROM userVideoGame.fechaCompra)', 'unit')
      .addSelect(
        `ROUND(SUM(userVideoGame.precio * ${profitMultiplier})::numeric, 2)::int`,
        'profit',
      )
      .addSelect('COUNT(*)::int', 'amount')
      .where('userVideoGame.fechaCompra BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere('userVideoGame.precio > 0');

    const profitQuery = this.userVideoGameRepository
      .createQueryBuilder('userVideoGame')
      .select('COUNT(*)::int', 'amount')
      .addSelect(
        `ROUND(SUM(userVideoGame.precio * ${profitMultiplier})::numeric, 2)::int`,
        'profit',
      )
      .where('userVideoGame.fechaCompra BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere('userVideoGame.precio > 0');

    if (developerId) {
      salesDataQuery
        .leftJoin('userVideoGame.videoGame', 'videoGame')
        .andWhere('videoGame.developer.id = :developerId', {
          developerId,
        });

      profitQuery
        .leftJoin('userVideoGame.videoGame', 'videoGame')
        .andWhere('videoGame.developer.id = :developerId', {
          developerId,
        });
    }
    try {
      const data = await salesDataQuery
        .orderBy('unit', 'ASC')
        .groupBy('unit')
        .getRawMany();

      const profit = await profitQuery.getRawOne();

      return {
        sales: data,
        count: Number(profit!.amount),
        profit: Number(profit!.profit),
      };
    } catch (error) {
      console.error('Error fetching sales data:', error);
      throw new InternalServerErrorException(
        'Error fetching sales data. Please try again later.',
      );
    }
  }

  private async getTotalVideoGames(developerId?: number) {
    return this.videoGameRepository.countBy({
      developer: {
        id: developerId || null,
      },
    });
  }
}
