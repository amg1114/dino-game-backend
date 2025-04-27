// statistics.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StatisticsService } from './statistics.service';
import { VideoGame } from '../video-games/entities/video-game.entity';
import { UserVideoGame } from '../video-games/entities/user-videogames.entity';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let mockVideoGameRepository: any;
  let mockUserVideoGameRepository: any;

  beforeEach(async () => {
    // Mocks básicos para los repositories
    mockVideoGameRepository = {
      createQueryBuilder: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        addGroupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn(),
        countBy: jest.fn(),
      })),
    };

    mockUserVideoGameRepository = {
      createQueryBuilder: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn(),
        getRawOne: jest.fn(),
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: getRepositoryToken(VideoGame),
          useValue: mockVideoGameRepository,
        },
        {
          provide: getRepositoryToken(UserVideoGame),
          useValue: mockUserVideoGameRepository,
        },
      ],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getStatistics', () => {
    it('should return all statistics data', async () => {
      const mockYearSalesData = {
        sales: [],
        count: 10,
        profit: 1000,
      };

      const mockBestWorst = {
        mostSoldVideoGame: { titulo: 'Game 1', sales: 50 },
        leastSoldVideoGame: { titulo: 'Game 2', sales: 1 },
      };

      const mockCount = 5;

      jest
        .spyOn(service as any, 'getAllSales')
        .mockResolvedValueOnce(mockYearSalesData)
        .mockResolvedValueOnce(mockYearSalesData)
        .mockResolvedValueOnce(mockYearSalesData)
        .mockResolvedValueOnce(mockYearSalesData);

      jest
        .spyOn(service as any, 'getBestAndWorstSellingGames')
        .mockResolvedValueOnce(mockBestWorst)
        .mockResolvedValueOnce(mockBestWorst);

      jest
        .spyOn(service as any, 'getTotalVideoGames')
        .mockResolvedValue(mockCount);

      // Ejecuta el método
      const result = await service.getStatistics('06', '2023');

      // Verifica la estructura del resultado
      expect(result).toEqual({
        yearSales: {
          currentYearSales: mockYearSalesData,
          prevYearSales: mockYearSalesData,
          bestWorstSellingGames: mockBestWorst,
        },
        monthSales: {
          currentMonthSales: mockYearSalesData,
          prevMonthSales: mockYearSalesData,
          bestWorstSellingGames: mockBestWorst,
        },
        totalVideoGames: mockCount,
      });
    });
  });
});
