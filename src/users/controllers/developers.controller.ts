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
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../config/enums/roles.enum';
import { DevelopersService } from '../services/developers.service';
import { CreateSolicitudDesarrolladorDto } from '../dto/create-solicitud-desarrollador.dto';
import { UpdateSolicitudDesarrolladorDto } from '../dto/update-solicitud-desarrollador.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SolicitudDesarrolladorQueries } from '../dto/SolicitudDesarrollador-queries.dto';
import { DesarrolladorQueries } from '../dto/desarrollador-queries.dto';

@ApiTags('Desarrolladores')
@Controller('users/developers')
@UseGuards(AuthGuard, RolesGuard)
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  /**
   * @returns Lista de desarrolladores
   */
  @Get()
  @Roles(Role.ADMINISTRATOR)
  @ApiOperation({
    summary: 'Obtener todos los desarrolladores',
    description: 'obtiene la lista de todos los desalloradores',
  })
  @ApiResponse({
    status: 200,
    description: 'lista de todos los desarrolladores',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron desarrolladores',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid limit value',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid offset value',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid order value',
  })
  @Get('desarrolladores')
  @Roles(Role.ADMINISTRATOR)
  findAllDevelopers(@Query() queries: DesarrolladorQueries) {
    return this.developersService.getDevelopers(queries);
  }

  /**
   * Endpoint para obtener todas las solicitudes
   * @returns {Promise <SolicitudDesarrollador[]> } Lista de solicitudes
   */
  @ApiOperation({
    summary: 'Obtener todas las solicitudes de desarrolladores',
    description:
      'Obtiene una lista con todas las solicitudes de los desarrolladores',
  })
  @ApiResponse({
    status: 200,
    description: 'lista de solicitudes de desarrolladores',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron solicitudes de desarrolladores',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron desarrolladores',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid limit value',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid offset value',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid order value',
  })
  @Get('solicitudes')
  @Roles(Role.ADMINISTRATOR)
  findAll(@Query() queries: SolicitudDesarrolladorQueries) {
    return this.developersService.getSolicitudes(queries);
  }

  /**
   * Endpoint para eliminar un desarrollador
   * @param developer ID desarrollador a eliminar
   * @returns desarrollador eliminado
   */
  @ApiOperation({
    summary: 'Eliminar un desarrollador',
    description: 'Eliminar un perfil de desarrollador con el id',
  })
  @ApiResponse({
    status: 200,
    description: 'Desarrollador eliminado correctamente',
  })
  @ApiResponse({
    status: 409,
    description: 'Desarrollador no eliminado',
  })
  @ApiResponse({
    status: 404,
    description: 'Desarrollador no encontrado',
  })
  @Delete(':developer')
  @Roles(Role.ADMINISTRATOR)
  deleteDeveloper(@Param('developer') developer: number) {
    return this.developersService.deleteDeveloper(developer);
  }

  /**
   * Endpoint para crear una solicitud de desarrollador
   * @param user ID del usuario que crea la solicitud
   * @param solicitudFields Campos de la solicitud a crear
   * @returns Solicitudes creada
   */
  @ApiOperation({
    summary: 'Crear una solicitud de desarrollador',
    description: 'Crea la socilicitud de un usuario para ser desarrollador',
  })
  @ApiResponse({
    status: 201,
    description: 'La solicitud fue enviada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Ya existe una solicitud',
  })
  @Post(':user/solicitud')
  @Public()
  createSolicitud(
    @Param('user') user: number,
    @Body() solicitudFields: CreateSolicitudDesarrolladorDto,
  ) {
    return this.developersService.createSolicitud(user, solicitudFields);
  }

  /**
   * Endpoint para obtener la solicitud de un usuario
   * @param developer ID del usuario a buscar
   * @returns Solicitud del usuario
   */
  @ApiOperation({
    summary: 'Obtener la solicitud de un usuario',
    description: 'Obtiene la solicitud de desarrollador de un usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'solicitud obtenida correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'La solicitud no fue encontrada',
  })
  @Get(':developer/solicitud')
  getSolicitud(@Param('developer') developer: number) {
    return this.developersService.getSolicitud(developer);
  }

  /**
   * Enpoint para actualizar la solicitud de un usuario
   * @param developer ID del usuario a actualizar
   * @param solicitudFields Campos de la solicitud a actualizar
   * @returns Resultado de la actualización
   */
  @ApiOperation({
    summary: 'Actualizar la solicitud de un usuario',
    description:
      'Actualiza el estado de la solicitud de un usuario para ser desarrollador',
  })
  @ApiResponse({
    status: 200,
    description: 'la solicitud se actualizó correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'la solicitud no fue encontrada',
  })
  @Patch(':developer/solicitud')
  updateSolicitud(
    @Param('developer') developer: number,
    @Body() solicitudFields: UpdateSolicitudDesarrolladorDto,
  ) {
    return this.developersService.updateSolicitud(developer, solicitudFields);
  }
}
