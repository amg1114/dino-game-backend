import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VideoGamesService } from './video-games.service';
import { CreateVideoGameDto } from './dto/create-video-game.dto';
import { UpdateVideoGameDto } from './dto/update-video-game.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('VideoGames')
@Controller('video-games')
export class VideoGamesController {
  constructor(private readonly videoGamesService: VideoGamesService) {}

  /**
   * EndPoint para buscar un videojuego basado en el ID parametro ID.
   * @param id ID del videojuego a
   * @returns Videojuego encontrado
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.videoGamesService.findById(id);
  }

  /**
   * EndPoint para crear un videojuego basado en los campos del body en la petición.
   * @param videoGameFields Campos del VideoJuego a crear.
   * @returns Videojuego creado
   */
  @Post()
  createVideoGame(@Body() videoGameFields: CreateVideoGameDto) {
    return this.videoGamesService.createVideoGame(videoGameFields);
  }

  /**
   * EndPoint para actualizar los campos de un videojuego especificados en el body de la petición para el
   * videojuego especificado por el parámetro ID en la petición.
   * @param id ID del videojuego a actualizar
   * @param videoGameFields Campos del videojuego a actualizar
   * @returns Resultado de la actualización
   */
  @Patch(':id')
  updateVideoGame(
    @Param('id') id: number,
    @Body() videoGameFields: UpdateVideoGameDto,
  ) {
    return this.videoGamesService.updateVideoGame(id, videoGameFields);
  }

  /**
   * EndPoint para eliminar un videojuego basado en el parámetro ID de la petición
   * @param id ID del video
   * @returns Resultado de la eliminación
   */
  @Delete(':id')
  deleteVideoGame(@Param('id') id: number) {
    return this.videoGamesService.deleteVideoGame(id);
  }
}
