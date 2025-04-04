import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeReport } from '../entities/type-report.entity';
import { Repository } from 'typeorm';
import { CreateTypeReportDto } from '../dto/create-type-report.dto';
import { UpdateTypeReportDto } from '../dto/update-type-report.dto';

@Injectable()
export class TypeReportsService {
  constructor(
    @InjectRepository(TypeReport)
    private typeReportRepository: Repository<TypeReport>,
  ) {}
  async findById(id: number) {
    const typeReport = await this.typeReportRepository.findOne({
      where: { id },
      relations: ['user', 'videoGame', 'typeReport'],
    });
    if (!typeReport) {
      throw new Error(`Report with ID ${id} not found`);
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

  async delete(id: number) {
    const typeReport = await this.findById(id);
    return await this.typeReportRepository.remove(typeReport);
  }
}
