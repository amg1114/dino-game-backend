import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
import { ApiTags } from '@nestjs/swagger';

@ApiTags ('Desarrolladores')
@Controller('users/developers')
@UseGuards(AuthGuard, RolesGuard)
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get()
  @Roles(Role.ADMINISTRATOR)
  getDevelopers() {
    return this.developersService.getDevelopers();
  }

  /**
   * Endpoint para obtener todas las solicitudes
   * @returns {Promise <SolicitudDesarrollador[]> } Lista de solicitudes
   */
  @Get('solicitudes')
  @Roles(Role.ADMINISTRATOR)
  getSolicitudes() {
    return this.developersService.getSolicitudes();
  }

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
  @Patch(':developer/solicitud')
  updateSolicitud(@Param('developer') developer: number, @Body() solicitudFields: UpdateSolicitudDesarrolladorDto){
    return this.developersService.updateSolicitud(developer, solicitudFields);
  }
}
