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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../config/enums/roles.enum';
import {
  DeleteResultResponseDto,
  UpdateResultResponseDto,
} from 'src/config/responses-dto';

import { VideoGameQueries } from '../dto/queries/video-game-queries.dto';
import { CreateVideoGameDto } from '../dto/video-games/create-video-game.dto';
import {
  DeleteVideoGameResponseDto,
  UpdateVideoGameResponseDto,
  VideoGameNotFoundResponseDto,
  VideoGamesNotFoundResponseDto,
} from '../dto/video-games/responses-dto';
import { UpdateVideoGameDto } from '../dto/video-games/update-video-game.dto';
import { VideoGame } from '../entities/video-game.entity';
import { VideoGamesService } from '../services/video-games.service';

@ApiTags('VideoGames')
@Controller('video-games')
@UseGuards(AuthGuard, RolesGuard)
export class VideoGamesController {
  constructor(private readonly videoGamesService: VideoGamesService) {}

  /**
   * EndPoint para buscar un videojuego basado en el ID parametro ID.
   * @param id ID del videojuego a buscar
   * @returns Videojuego encontrado
   */
  @ApiOperation({
    summary: 'Obtener todos videojuego',
    description: 'Obtiene un videojuegos basado en el id parametro id',
  })
  @ApiResponse({
    status: 200,
    description: 'Los videojuegos fueron encontrados exitosamente',
    type: [VideoGame],
  })
  @ApiResponse({
    status: 404,
    description: 'Los videojuegos no fueron encontrados',
    type: VideoGamesNotFoundResponseDto,
  })
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
  @ApiOperation({
    summary: 'Crear un videojuego',
    description:
      'Crea un videojuego basado en los campos del body en la petición.',
  })
  @ApiResponse({
    status: 200,
    description: 'El video juego fue añadido exitosamente',
    type: [VideoGame],
  })
  @Post()
  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  createVideoGame(videoGameFields: CreateVideoGameDto, @Request() req: any) {
    return this.videoGamesService.createVideoGame(req.user.id, videoGameFields);
  }

  /**
   * EndPoint para obtener los videojuegos de un desarrollador
   * @param developer ID del desarrollador
   * @returns Videojuegos del desarrollador
   */
  @ApiOperation({
    summary: 'Obtener todos los videojuegos de un desarrollador',
    description: 'Obtiene un videojuego publicados por un desarrollador',
  })
  @ApiResponse({
    status: 200,
    description: 'el video juego fue encontrado exitosamente',
    type: [VideoGame],
  })
  @ApiResponse({
    status: 404,
    description: 'El videojuego no fue encontrado',
    type: VideoGameNotFoundResponseDto,
  })
  @Get('developer/:developer/video-games')
  @Roles(Role.DEVELOPER)
  getDeveloperVideoGames(@Param('developer') developer: number) {
    return this.videoGamesService.findDeveloperVideoGames(developer);
  }

  /**
   * EndPoint para buscar un videojuego basado en el ID parametro ID.
   * @param {number} videogame ID del videojuego a buscar
   * @returns Videojuego encontrado
   */
  @ApiOperation({
    summary: 'Obtener un videojuego',
    description: 'Obtiene un videojuego basado en el id recibido',
  })
  @ApiResponse({
    status: 200,
    description: 'el video juego fue encontrado exitosamente',
    type: [VideoGame],
  })
  @ApiResponse({
    status: 404,
    description: 'El videojuego no fue encontrado',
    type: VideoGameNotFoundResponseDto,
  })
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
  @ApiOperation({
    summary: 'Actualizar un videojuego',
    description: 'Actualizar un videojuego',
  })
  @ApiResponse({
    status: 200,
    description: 'el video juego fue actualizado exitosamente',
    type: UpdateResultResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'El videojuego no fue actualizado exitosamente',
    type: UpdateVideoGameResponseDto,
  })
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
  @ApiOperation({
    summary: 'Eliminar un videojuego',
    description: 'Elimina un videojuego',
  })
  @ApiResponse({
    status: 200,
    description: 'el video juego fue eliminado exitosamente',
    type: DeleteResultResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'El videojuego no fue eliminado exitosamente',
    type: DeleteVideoGameResponseDto,
  })
  @Delete(':videogame')
  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  deleteVideoGame(@Param('videogame') videogame: number) {
    return this.videoGamesService.deleteVideoGame(videogame);
  }

  /**
   * EndPoint para obtener las ventas de un videojuego en un mes específico
   * @param videoGame ID del videojuego
   * @param month Mes de la venta (Index 0 = Enero, Index 11 = Diciembre)
   * @returns Ventas del videojuego en el mes
   */
  @ApiOperation({
    summary: 'Obtener las ventas de un video juego ',
    description: 'Obtiene todas las ventas de un videojuego por mes actual',
  })
  @ApiResponse({
    status: 200,
    description: 'las ventas del videojuego fueron encontradas exitosamente',
    type: DeleteResultResponseDto,
  })
  @Get(':videogame/ventas/:mes')
  @Roles(Role.DEVELOPER)
  getVideoGameSales(
    @Param('videogame') videoGame: number,
    @Param('mes') month: number,
  ) {
    return this.videoGamesService.getSalesByMonth(videoGame, month);
  }
}
