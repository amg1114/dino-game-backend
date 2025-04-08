import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeReport } from '../entities/type-report.entity';
import { ILike, Repository } from 'typeorm';
import { CreateTypeReportDto } from '../dto/create-type-report.dto';
import { UpdateTypeReportDto } from '../dto/update-type-report.dto';
import { ReportQueries } from '../dto/report-queries.dto';

@Injectable()
export class TypeReportsService {
  constructor(
    @InjectRepository(TypeReport)
    private typeReportRepository: Repository<TypeReport>,
  ) {}
  async findById(id: number) {
    const typeReport = await this.typeReportRepository.findOne({
      where: { id },
    });
    if (!typeReport) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return typeReport;
  }

  async create(typeReportData: CreateTypeReportDto) {
    const newTypeReport = this.typeReportRepository.create(typeReportData);
    return await this.typeReportRepository.save(newTypeReport);
  }

  async update(id: number, updateData: UpdateTypeReportDto) {
    const typeReport = await this.findById(id);
    Object.assign(typeReport, updateData);
    return await this.typeReportRepository.save(typeReport);
  }
  async findAll(querys: ReportQueries) {
    const { offset = 0, limit = null, search = '', order = 'ASC' } = querys;
    const [data, total] = await this.typeReportRepository.findAndCount({
      where: search ? { title: ILike(`%${search}%`) } : {},
      order: { createdAt: order },
      ...(limit !== null ? { skip: offset * limit, take: limit } : {}),
    });

    return {
      data,
      offset,
      total,
    };
  }
  async delete(id: number) {
    const result = await this.typeReportRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return result;
  }
}
