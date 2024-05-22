import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { VideoGamesService } from '../services/video-games.service';
import { CreateVideoGameDto } from '../dto/video-games/create-video-game.dto';
import { UpdateVideoGameDto } from '../dto/video-games/update-video-game.dto';
import { ApiTags } from '@nestjs/swagger';
import { VideoGameQueries } from '../dto/queries/video-game-queries.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../config/enums/roles.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Public } from '../../auth/decorators/public.decorator';

@ApiTags('VideoGames')
@Controller('video-games')
@UseGuards(AuthGuard, RolesGuard)
export class VideoGamesController {
  constructor(private readonly videoGamesService: VideoGamesService) {}

  /**
   * EndPoint para buscar un videojuego basado en el ID parametro ID.
   * @param id ID del videojuego a
   * @returns Videojuego encontrado
   */
  @Get()
  @Public()
  findAll(@Query() queries: VideoGameQueries) {
    return this.videoGamesService.findAll(queries);
  }

  /**
   * EndPoint para crear un videojuego basado en los campos del body en la petición.
   * @param videoGameFields Campos del VideoJuego a crear.
   * @returns Videojuego creado
   */
  @Post()
  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  createVideoGame(@Request() req: any, @Body() videoGameFields: CreateVideoGameDto) {
    return this.videoGamesService.createVideoGame(req.user.id, videoGameFields);
  }

  /**
   * EndPoint para buscar un videojuego basado en el ID parametro ID.
   * @param {number} videogame ID del videojuego a
   * @returns Videojuego encontrado
   */
  @Get(':videogame')
  @Public()
  findOne(@Param('videogame') videogame: number) {
    return this.videoGamesService.findById(videogame);
  }

  /**
   * EndPoint para actualizar los campos de un videojuego especificados en el body de la petición para el
   * videojuego especificado por el parámetro ID en la petición.
   * @param id ID del videojuego a actualizar
   * @param videoGameFields Campos del videojuego a actualizar
   * @returns Resultado de la actualización
   */
  @Patch(':videogame')
  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  updateVideoGame(
    @Param('videogame') videogame: number,
    @Body() videoGameFields: UpdateVideoGameDto,
  ) {
    return this.videoGamesService.updateVideoGame(videogame, videoGameFields);
  }

  /**
   * EndPoint para eliminar un videojuego basado en el parámetro ID de la petición
   * @param id ID del video
   * @returns Resultado de la eliminación
   */
  @Delete(':videogame')
  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  deleteVideoGame(@Param('videogame') videogame: number) {
    return this.videoGamesService.deleteVideoGame(videogame);
  }
}
