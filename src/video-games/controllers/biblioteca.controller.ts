import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { VideoGamesService } from '../services/video-games.service';
import { AddVideoGameToUserDto } from '../dto/video-games/add-videogame-to-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserVideoGame } from '../entities/user-videogames.entity';
import {
  VideoGameNotFoundResponseDto,
  VideoGamesNotFoundResponseDto,
} from '../dto/video-games/responses-dto';
import { DeleteResultResponseDto } from 'src/config/responses-dto';

@ApiTags('VideoGames')
@Controller('video-games/biblioteca')
@UseGuards(AuthGuard)
export class BibliotecaController {
  constructor(private readonly videoGamesService: VideoGamesService) {}

  /**
   * EndPoint para buscar los videojuegos adquiridos por un usuario basado en el ID del usuario.
   * @returns Videojuegos del usuario
   */
  @Get()
  @ApiOperation({
    summary: 'Obtener los videojuegos adquiridos por un usuario',
    description: 'Obtiene los videojuegos adquiridos por un usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Los videojuegos fueron encontrados correctamente',
    type: [UserVideoGame],
  })
  @ApiResponse({
    status: 404,
    description: 'Los videos juegos no fueron encontrados',
    type: VideoGamesNotFoundResponseDto,
  })
  getVideoGamesByUser(@Request() req: any) {
    const user = req.user.id;
    return this.videoGamesService.findUserVideoGames(user);
  }

  /**
   * EndPoint para buscar un videojuego en la biblioteca del usuario basado en el ID del juego.
   * @param {number} videogame ID del videojuego a buscar
   * @returns Videojuego encontrado
   */
  @ApiOperation({
    summary: 'Obtener un videojuego en la biblioteca de un usuario',
    description:
      'Obtiene un videojuego adquirido por un usuario basado en el ID del juego',
  })
  @ApiResponse({
    status: 200,
    description: 'el video juego fue encontrado exitosamente',
    type: UserVideoGame,
  })
  @ApiResponse({
    status: 404,
    description: 'El videojuego no fue encontrado',
    type: VideoGameNotFoundResponseDto,
  })
  @Get(':videogame')
  getVideoGameById(@Param('videogame') videogame: number, @Request() req: any) {
    return this.videoGamesService.findUserVideoGame(req.user.id, videogame);
  }

  /**
   * EndPoint para añadir un videojuego a la biblioteca del usuario basado en el ID del juego.
   * @param {number} videogame ID del videojuego a añadir
   * @returns Resultado de la adición
   */
  @ApiOperation({
    summary: 'Añadir un videojuego a la biblioteca de un usuario',
    description: 'Añade un vieo a la biblioteca de un usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'el video juego fue agregado exitosamente',
    type: UserVideoGame,
  })
  @ApiResponse({
    status: 404,
    description: 'El videojuego no fue encontrado',
    type: VideoGameNotFoundResponseDto,
  })
  @Post(':videogame')
  addVideoGameToUser(
    @Param('videogame') videogame: number,
    @Request() req: any,
    @Body() compraFields: AddVideoGameToUserDto,
  ) {
    return this.videoGamesService.addVideoGameToUser(
      videogame,
      req.user.id,
      compraFields,
    );
  }

  /**
   * EndPoint para eliminar un videojuego de la biblioteca del usuario basado en el ID del juego.
   * @param {number} videogame ID del videojuego a eliminar
   * @returns Resultado de la eliminación
   */
  @ApiOperation({
    summary: 'Eliminar un videojuego de la biblioteca de un usuario',
    description: 'Elimina un videojuego adquirido por un usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'el video juego fue eliminado exitosamente',
    type: DeleteResultResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'El videojuego no fue encontrado',
    type: VideoGameNotFoundResponseDto,
  })
  @Delete(':videogame')
  deleteVideoGameById(
    @Param('videogame') videogame: number,
    @Request() req: any,
  ) {
    return this.videoGamesService.deleteUserVideoGame(req.user.id, videogame);
  }
}
