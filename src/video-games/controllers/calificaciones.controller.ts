import {
  Body,
  Controller,
  Param,
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

@Controller('video-games/:videogame/calificaciones')
@UseGuards(AuthGuard, RolesGuard)
export class CalificacionesController {
  constructor(private readonly calificacionesService: CalificacionesService) {}

  @Post()
  @Roles(Role.ESTANDAR)
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
}

@Controller('video-games/:videogame/comentarios')
@UseGuards(AuthGuard, RolesGuard)
export class ComentariosController {
  constructor(private readonly calificacionesService: CalificacionesService) {}

  @Post()
  @Roles(Role.ESTANDAR)
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
}
