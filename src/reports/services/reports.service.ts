import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../entities/report.entity';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  // falta agregar para que sea el id del usuario que genera el request
  async create(createReportDto: CreateReportDto) {
    const report = this.reportRepository.create(createReportDto);
    return await this.reportRepository.save(report);
  }

  async findAll(query: {
    offset?: number;
    limit?: number | null;
    search?: string;
    order?: 'ASC' | 'DESC';
  }) {
    const { offset = 0, limit = null, search = '', order = 'ASC' } = query;

    const [data, total] = await this.reportRepository.findAndCount({
      where: search ? { typeReport: { title: search } } : {},
      order: { createdAt: order },
      ...(limit !== null ? { skip: offset, take: limit } : {}),
    });

    return {
      data,
      total,
      offset,
      limit,
    };
  }

  async findByVideoGame(
    videoGameId: number,
    query: {
      offset?: number;
      limit?: number | null;
      search?: string;
      order?: 'ASC' | 'DESC';
    },
  ) {
    const { offset = 0, limit = null, search = '', order = 'ASC' } = query;

    const [data, total] = await this.reportRepository.findAndCount({
      where: {
        videoGame: { id: videoGameId },
        ...(search ? { typeReport: { title: search } } : {}),
      },
      order: { createdAt: order },
      ...(limit !== null ? { skip: offset, take: limit } : {}),
    });

    return {
      data,
      total,
      offset,
      limit,
    };
  }

  async findByUser(
    userId: number,
    query: {
      offset?: number;
      limit?: number | null;
      search?: string;
      order?: 'ASC' | 'DESC';
    },
  ) {
    const { offset = 0, limit = null, search = '', order = 'ASC' } = query;

    const [data, total] = await this.reportRepository.findAndCount({
      where: {
        user: { id: userId },
        ...(search ? { typeReport: { title: search } } : {}),
      },
      order: { createdAt: order },
      ...(limit !== null ? { skip: offset, take: limit } : {}),
    });

    return {
      data,
      total,
      offset,
      limit,
    };
  }

  async findOne(id: number) {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['user', 'videoGame', 'typeReport'],
    });
    if (!report) {
      throw new Error(`Report with ID ${id} not found`);
    }
    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const report = await this.reportRepository.preload({
      id,
      ...updateReportDto,
    });
    if (!report) {
      throw new Error(`Report with ID ${id} not found`);
    }
    return await this.reportRepository.save(report);
  }

  async remove(id: number) {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) {
      throw new Error(`Report with ID ${id} not found`);
    }
    return await this.reportRepository.remove(report);
  }
}
