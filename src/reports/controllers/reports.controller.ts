import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { ReportQueries } from '../dto/report-queries.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/config/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reportes')
@Controller('reports')
@UseGuards(AuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  /**
   * Endpoint para crear un reporte
   * @param createReportDto Los datos para crear un nuevo reporte
   * @param req Información del usuario autenticado
   * @param videoGameId El ID del videojuego asociado al reporte
   * @returns El reporte recién creado
   */
  @ApiOperation({
    summary: 'Crear un reporte',
    description: 'Crea un nuevo reporte asociado a un videojuego y usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'El reporte fue creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o faltantes',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario, Videojuego o Tipo de Reporte no encontrado',
  })
  @Post(':videoGameId')
  @Roles(Role.ESTANDAR)
  create(
    @Body() createReportDto: CreateReportDto,
    @Request() req: any,
    @Param('videoGameId') videoGameId: number,
  ) {
    return this.reportsService.create(
      createReportDto,
      req.user.id,
      videoGameId,
    );
  }

  /**
   * Endpoint para obtener todos los reportes
   * @param query Parámetros de consulta para filtrar y paginar los reportes
   * @returns Lista paginada de reportes
   */
  @ApiOperation({
    summary: 'Obtener todos los reportes',
    description: 'Obtiene una lista paginada de todos los reportes',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reportes obtenida exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros de consulta inválidos',
  })
  @Roles(Role.ADMINISTRATOR)
  @Get()
  findAll(@Query() query: ReportQueries) {
    return this.reportsService.findAll(query);
  }

  /**
   * Endpoint para obtener reportes asociados a un videojuego
   * @param videoGameId El ID del videojuego
   * @param query Parámetros de consulta para filtrar y paginar los reportes
   * @param req Información del usuario autenticado
   * @returns Lista paginada de reportes asociados al videojuego
   */
  @ApiOperation({
    summary: 'Obtener reportes por videojuego',
    description:
      'Obtiene una lista de reportes asociados a un videojuego específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reportes obtenida exitosamente',
  })
  @ApiResponse({
    status: 403,
    description: 'El usuario no tiene permiso para ver estos reportes',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario o Videojuego no encontrado',
  })
  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  @Get('video-game/:videoGameId')
  findByVideoGame(
    @Param('videoGameId') videoGameId: string,
    @Query() query: ReportQueries,
    @Request() req: any,
  ) {
    return this.reportsService.findByVideoGame(
      +videoGameId,
      query,
      req.user.id,
    );
  }

  /**
   * Endpoint para actualizar un reporte
   * @param id El ID del reporte
   * @param updateReportDto Los datos para actualizar el reporte
   * @returns El reporte actualizado
   */
  @ApiOperation({
    summary: 'Actualizar un reporte',
    description: 'Actualiza un reporte existente en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'El reporte fue actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'El reporte no fue encontrado',
  })
  @Roles(Role.ADMINISTRATOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  /**
   * Endpoint para eliminar un reporte
   * @param id El ID del reporte
   * @returns El resultado de la eliminación
   */
  @ApiOperation({
    summary: 'Eliminar un reporte',
    description: 'Elimina un reporte existente en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'El reporte fue eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'El reporte no fue encontrado',
  })
  @Roles(Role.ADMINISTRATOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
