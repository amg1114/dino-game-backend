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
import { ApiTags } from '@nestjs/swagger';

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
  getVideoGamesByUser(@Request() req: any) {
    const user = req.user.id;
    return this.videoGamesService.findUserVideoGames(user);
  }

  /**
   * EndPoint para buscar un videojuego en la biblioteca del usuario basado en el ID del juego.
   * @param {number} videogame ID del videojuego a buscar
   * @returns Videojuego encontrado
   */
  @Get(':videogame')
  getVideoGameById(@Param('videogame') videogame: number, @Request() req: any) {
    return this.videoGamesService.findUserVideoGame(req.user.id, videogame);
  }

  /**
   * EndPoint para añadir un videojuego a la biblioteca del usuario basado en el ID del juego.
   * @param {number} videogame ID del videojuego a añadir
   * @returns Resultado de la adición
   */
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
  @Delete(':videogame')
  deleteVideoGameById(
    @Param('videogame') videogame: number,
    @Request() req: any,
  ) {
    return this.videoGamesService.deleteUserVideoGame(req.user.id, videogame);
  }
}
