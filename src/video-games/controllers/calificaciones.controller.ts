import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CalificacionesService } from '../services/calificaciones.service';
import { CreateCalificacionDto } from '../dto/calificaciones/create-calificacion.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/config/enums/roles.enum';
import { CreateComentarioDto } from '../dto/calificaciones/create-comentario.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('video-games/:videogame/calificaciones')
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('Calificaciones')
export class CalificacionesController {
  constructor(private readonly calificacionesService: CalificacionesService) {}

  @Post()
  @Roles(Role.ESTANDAR)
  @ApiOperation({
    summary: 'Crear calificación',
    description: 'Crea una calificación para un videojuego por un usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'Calificación creada correctamente',
  })
  @ApiResponse({
    status: 409,
    description:
      'Ya existe una calificación para este videojuego por parte de este usuario',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró el videojuego',
  })
  async createCalificacion(
    @Body() calificacionFields: CreateCalificacionDto,
    @Param('videogame') videoGame: string,
    @Request() req: any,
  ) {
    return this.calificacionesService.createCalificacion(
      req.user.id,
      videoGame,
      calificacionFields,
    );
  }

  @Patch(':calificacion')
  @Roles(Role.ESTANDAR)
  @ApiOperation({
    summary: 'Actualizar calificación',
    description: 'Actualiza la calificación de un videojuego por un usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Calificación actualizada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró la calificación',
  })
  async updateCalificacion(
    @Body() calificacionFields: CreateCalificacionDto,
    @Param('calificacion') id: number,
    @Request() req: any,
  ) {
    return this.calificacionesService.updateCalificacion(
      id,
      req.user.id,
      calificacionFields,
    );
  }

  @Delete(':calificacion')
  @Roles(Role.ESTANDAR)
  async deleteCalificacion(
    @Param('calificacion') id: number,
    @Request() req: any,
  ) {
    return this.calificacionesService.deleteCalificacion(id, req.user.id);
  }
}

@Controller('video-games/:videogame/comentarios')
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('Comentarios')
export class ComentariosController {
  constructor(private readonly calificacionesService: CalificacionesService) {}

  @Post()
  @Roles(Role.ESTANDAR)
  @ApiOperation({
    summary: 'Crear comentario',
    description: 'Crea un comentario para un videojuego por un usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'Comentario creado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró el videojuego',
  })
  async createComentario(
    @Body() comentarioFields: CreateComentarioDto,
    @Param('videogame') videoGame: string,
    @Request() req: any,
  ) {
    return this.calificacionesService.createComentario(
      req.user.id,
      videoGame,
      comentarioFields,
    );
  }

  @Patch(':comentario')
  @Roles(Role.ESTANDAR)
  @ApiOperation({
    summary: 'Actualizar comentario',
    description: 'Actualiza el comentario de un videojuego por un usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Comentario actualizado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró el comentario',
  })
  async updateComentario(
    @Body() comentarioFields: CreateComentarioDto,
    @Param('comentario') id: number,
    @Request() req: any,
  ) {
    return this.calificacionesService.updateComentario(
      id,
      req.user.id,
      comentarioFields,
    );
  }

  @Delete(':comentario')
  @Roles(Role.ESTANDAR)
  @ApiOperation({
    summary: 'Eliminar comentario',
    description: 'Elimina un comentario de un videojuego por un usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Comentario eliminado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró el comentario',
  })
  async deleteComentario(@Param('comentario') id: number, @Request() req: any) {
    return this.calificacionesService.deleteComentario(id, req.user.id);
  }
}
