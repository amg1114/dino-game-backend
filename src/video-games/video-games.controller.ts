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

@Controller('video-games')
export class VideoGamesController {
  constructor(private readonly videoGamesService: VideoGamesService) {}

  /**
   * Busca un videojuego basado en el ID que recibe la función.
   * @param id ID del videojuego a
   * @returns Videojuego encontrado
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.videoGamesService.findById(id);
  }

  /**
   * Crea un videojuego basado en los campos recibidos por la función.
   * @param videoGameFields Campos del VideoJuego a crear.
   * @returns Videojuego creado
   */
  @Post()
  createVideoGame(@Body() videoGameFields: CreateVideoGameDto) {
    return this.videoGamesService.createVideoGame(videoGameFields);
  }

  /**
   * Actualiza los campos de un videojuego según el ID del videojuego recibido por la función.
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
   * Elimina un videojuego basado en el ID recibido
   * @param id ID del video
   * @returns Resultado de la eliminación
   */
  @Delete(':id')
  deleteVideoGame(@Param('id') id: number) {
    return this.videoGamesService.deleteVideoGame(id);
  }
}
