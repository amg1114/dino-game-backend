import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
    videoGameId: number,
  ) {
    const user = await this.userService.findById(userId);
    const videoGame = await this.videoGameService.findById(videoGameId);
    const typeReport = await this.typeReportService.findById(
      createReportDto.typeReportId,
    );
    if (!user || !videoGame || !typeReport) {
      throw new Error('User, VideoGame or TypeReport not found');
    }
    const report = this.reportRepository.create({
      ...createReportDto,
      user: user,
      videoGame: videoGame,
      typeReport: typeReport,
    });
    return await this.reportRepository.save(report);
  }

  async findAll(query: ReportQueries): Promise<PaginatedDataResponse<Report>> {
    const { offset = 0, limit = null, search = '', order = 'ASC' } = query;

    const [data, total] = await this.reportRepository.findAndCount({
      where: search ? { typeReport: { title: search } } : {},
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
    videoGameId: number,
    query: ReportQueries,
    userId: number,
  ): Promise<PaginatedDataResponse<Report>> {
    const { offset = 0, limit = null, search = '', order = 'ASC' } = query;
    const user = await this.userService.findById(userId);
    const videoGame = await this.videoGameService.findById(videoGameId);
    if (!user || !videoGame) {
      throw new Error('User or VideoGame not found');
    }
    if (user.tipo === Role.DEVELOPER && videoGame.developer !== user) {
      throw new Error(`You do not have permission to view this report`);
    }
    const [data, total] = await this.reportRepository.findAndCount({
      where: {
        videoGame: { id: videoGameId },
        ...(search ? { typeReport: { title: search } } : {}),
      },
      order: { createdAt: order },
      ...(limit !== null ? { skip: offset * limit, take: limit } : {}),
    });

    return {
      data,
      offset,
      total,
    };
  }

  async findByUser(
    userId: number,
    query: ReportQueries,
  ): Promise<PaginatedDataResponse<Report>> {
    const { offset = 0, limit = null, search = '', order = 'ASC' } = query;

    const [data, total] = await this.reportRepository.findAndCount({
      where: {
        user: { id: userId },
        ...(search ? { typeReport: { title: search } } : {}),
      },
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
      throw new Error(`Report with ID ${id} not found`);
    }
    if (![Role.ADMINISTRATOR, Role.DEVELOPER].includes(user.tipo)) {
      throw new Error(`You do not have permission to view this report`);
    }
    if (user.tipo === Role.DEVELOPER && report.videoGame.developer !== user) {
      throw new Error(`You do not have permission to view this report`);
    }

    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const reportUpdate = await this.reportRepository.preload({
      id,
      ...updateReportDto,
    });
    if (!reportUpdate) {
      throw new Error(`Report with ID ${id} not found`);
    }

    return await this.reportRepository.save(reportUpdate);
  }

  async remove(id: number) {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) {
      throw new Error(`Report with ID ${id} not found`);
    }
    return await this.reportRepository.remove(report);
  }
}
