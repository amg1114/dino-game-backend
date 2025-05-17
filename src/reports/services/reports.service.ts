import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../entities/report.entity';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { PaginatedDataResponse } from 'src/config/models/paginatedData-response.interface';
import { ReportQueries } from '../dto/report-queries.dto';
import { TypeReportsService } from './type-reports.service';
import { UsersService } from 'src/users/services/users.service';
import { VideoGamesService } from 'src/video-games/services/video-games.service';
import { Role } from 'src/config/enums/roles.enum';
import { State } from 'src/config/enums/state';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly typeReportService: TypeReportsService,
    private readonly videoGameService: VideoGamesService,
    private readonly userService: UsersService,
  ) {}

  async create(
    createReportDto: CreateReportDto,
    userId: number,
    videoGameSlug: string,
  ) {
    const user = await this.userService.findById(userId);
    const videoGame = await this.videoGameService.findBySlug(videoGameSlug);
    const typeReport = await this.typeReportService.findById(
      createReportDto.typeReportId,
    );

    const usersReports = await this.findByVideoGame(videoGameSlug, {}, userId);

    const existingReport = usersReports.data.find(
      (report) => report.user.id === userId,
    );
    if (existingReport) {
      throw new UnauthorizedException(
        `You have already reported this video game with this type of report`,
      );
    }
    if (!user || !videoGame || !typeReport) {
      throw new NotFoundException('User, VideoGame or TypeReport not found');
    }
    const report = this.reportRepository.create({
      state: State.PENDING,
      user: user,
      videoGame: videoGame,
      typeReport: typeReport,
    });
    return await this.reportRepository.save(report);
  }

  async findAll(query: ReportQueries): Promise<PaginatedDataResponse<Report>> {
    const { offset = 0, limit = null, search = '', order = 'ASC' } = query;

    const [data, total] = await this.reportRepository.findAndCount({
      where: search ? { typeReport: { title: ILike(`%${search}%`) } } : {},
      relations: ['user', 'videoGame', 'typeReport'],
      order: { createdAt: order },
      ...(limit !== null ? { skip: offset * limit, take: limit } : {}),
    });

    return {
      data,
      offset,
      total,
    };
  }

  async findByVideoGame(
    videoGameSlug: string,
    query: ReportQueries,
    userId: number,
  ): Promise<PaginatedDataResponse<Report>> {
    const { offset = 0, limit = null, search = '', order = 'ASC' } = query;
    const user = await this.userService.findById(userId);
    const videoGame = await this.videoGameService.findBySlug(videoGameSlug);
    if (!user || !videoGame) {
      throw new NotFoundException('User or VideoGame not found');
    }
    if (user.tipo === Role.DEVELOPER && videoGame.developer !== user) {
      throw new UnauthorizedException(
        `You do not have permission to view this report`,
      );
    }
    const [data, total] = await this.reportRepository.findAndCount({
      where: {
        videoGame: { slug: videoGameSlug },
        ...(search ? { typeReport: { title: search } } : {}),
      },
      relations: ['user', 'videoGame', 'typeReport'],
      order: { createdAt: order },
      ...(limit !== null ? { skip: offset * limit, take: limit } : {}),
    });

    return {
      data,
      offset,
      total,
    };
  }

  async findOne(id: number, userId: number) {
    const user = await this.userService.findById(userId);
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['user', 'videoGame', 'typeReport'],
    });
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    if (![Role.ADMINISTRATOR, Role.DEVELOPER].includes(user.tipo)) {
      throw new UnauthorizedException(
        `You do not have permission to view this report`,
      );
    }
    if (user.tipo === Role.DEVELOPER && report.videoGame.developer !== user) {
      throw new UnauthorizedException(
        `You do not have permission to view this report`,
      );
    }

    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const reportUpdate = await this.reportRepository.preload({
      id,
      ...updateReportDto,
    });
    if (!reportUpdate) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return await this.reportRepository.save(reportUpdate);
  }

  async remove(id: number) {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return await this.reportRepository.softDelete(id);
  }
}
