import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TypeReportsService } from '../services/type-reports.service';
import { CreateTypeReportDto } from '../dto/create-type-report.dto';
import { UpdateTypeReportDto } from '../dto/update-type-report.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/config/enums/roles.enum';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TypeReport } from '../entities/type-report.entity';

@ApiTags('Tipos de Reportes')
@Controller('type-reports')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMINISTRATOR)
export class TypeReportsController {
  constructor(private readonly typeReportsService: TypeReportsService) {}

  /**
   * Endpoint para obtener un tipo de reporte por ID
   * @param id El ID del tipo de reporte
   * @returns El tipo de reporte con el ID especificado
   */
  @ApiOperation({
    summary: 'Obtener un tipo de reporte',
    description: 'Obtiene un tipo de reporte basado en su ID',
  })
  @ApiResponse({
    status: 200,
    description: 'El tipo de reporte fue encontrado exitosamente',
    type: TypeReport,
  })
  @ApiResponse({
    status: 404,
    description: 'El tipo de reporte no fue encontrado',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.typeReportsService.findById(id);
  }

  /**
   * Endpoint para crear un nuevo tipo de reporte
   * @param typeReportData Los datos para crear un nuevo tipo de reporte
   * @returns El tipo de reporte recién creado
   */
  @ApiOperation({
    summary: 'Crear un tipo de reporte',
    description: 'Crea un nuevo tipo de reporte',
  })
  @ApiResponse({
    status: 201,
    description: 'El tipo de reporte fue creado exitosamente',
    type: TypeReport,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o faltantes',
  })
  @Post()
  async create(@Body() typeReportData: CreateTypeReportDto) {
    return await this.typeReportsService.create(typeReportData);
  }

  /**
   * Endpoint para actualizar un tipo de reporte por ID
   * @param id El ID del tipo de reporte
   * @param updateData Los datos para actualizar el tipo de reporte
   * @returns El tipo de reporte actualizado
   */
  @ApiOperation({
    summary: 'Actualizar un tipo de reporte',
    description: 'Actualiza un tipo de reporte existente en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'El tipo de reporte fue actualizado exitosamente',
    type: TypeReport,
  })
  @ApiResponse({
    status: 404,
    description: 'El tipo de reporte no fue encontrado',
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: UpdateTypeReportDto,
  ) {
    return await this.typeReportsService.update(id, updateData);
  }

  /**
   * Endpoint para eliminar un tipo de reporte por ID
   * @param id El ID del tipo de reporte
   * @returns El resultado de la eliminación
   */
  @ApiOperation({
    summary: 'Eliminar un tipo de reporte',
    description: 'Elimina un tipo de reporte existente en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'El tipo de reporte fue eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'El tipo de reporte no fue encontrado',
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.typeReportsService.delete(id);
  }
}
