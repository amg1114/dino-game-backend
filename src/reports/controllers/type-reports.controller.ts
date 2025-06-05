import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { ReportQueries } from '../dto/report-queries.dto';

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
    summary: 'Lista los tipos de reporte',
    description: 'Lista los tipos de reportes disponibles en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'los tipos de reportes fue encontrado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'ningun tipo de reporte fue encontrado',
  })
  @Get()
  async findAll(@Query() query: ReportQueries) {
    return await this.typeReportsService.findAll(query);
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
  })
  @ApiResponse({
    status: 404,
    description: 'El tipo de reporte no fue encontrado',
  })
  @Patch(':id')
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
