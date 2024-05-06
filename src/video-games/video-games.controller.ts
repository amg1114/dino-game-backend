import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VideoGamesService } from './video-games.service';
import { CreateVideoGameDto } from './dto/video-games/create-video-game.dto';
import { UpdateVideoGameDto } from './dto/video-games/update-video-game.dto';
import { ApiTags } from '@nestjs/swagger';
import { VideoGameQueries } from './dto/queries/video-game-queries.dto';
import { CreateDescuentoDto } from './dto/descuentos/create-descuento.dto';
import { UpdateDescuentoDto } from './dto/descuentos/update-descuento.dto';

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
   * EndPoint para buscar un videojuego basado en el ID parametro ID.
   * @param id ID del videojuego a
   * @returns Videojuego encontrado
   */
  @Get()
  findAll(@Query() queries: VideoGameQueries) {
    return this.videoGamesService.findAll(queries);
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

  /* ---------- ENDPOINTS PARA VIDEOGAMES & USERS ---------- */

  /**
   * EndPoint para buscar los videojuegos de un usuario basado en el ID del usuario.
   * @param id ID del usuario
   * @returns Videojuegos del usuario
   */
  @Get('user/:id')
  getVideoGamesByUser(@Param('id') id: number) {
    return this.videoGamesService.findByUser(id);
  }

  /**
   * EndPoint para agregar un videojuego a un usuario basado en los parámetros ID del videojuego y del usuario.
   * @param id ID del videojuego
   * @param user ID del usuario
   * @returns Resultado de la operación
   */
  @Post(':id/user/:user')
  addVideoGameToUser(@Param('id') id: number, @Param('user') user: number){
    return this.videoGamesService.addVideoGameToUser(id, user);
  }

  /* ---------- ENDPOINTS PARA DESCUENTOS ---------- */

  /**
   * EndPoint para buscar los descuentos activos de un videojuego basado en el ID del videojuego.
   * @param id ID del videojuego
   * @returns Descuentos del videojuego
   */
  @Get(':id/descuentos')
  getDescuentos(@Param('id') id: number){
    return this.videoGamesService.getDescuentosByVideoGame(id);
  }

  /**
   * EndPoint para agregar un descuento a un videojuego basado en el ID del videojuego y los campos del body.
   * @param id ID del videojuego
   * @param descuento Campos del descuento a agregar
   * @returns Descuento agregado
   */
  @Post(':id/descuentos')
  createDescuento(@Param('id') id: number, @Body() descuento: CreateDescuentoDto){
    return this.videoGamesService.addDescuentoToVideoGame(id, descuento);
  }

  /**
   * EndPoint para actualizar un descuento de un videojuego basado en el ID del videojuego y el porcentaje del descuento.
   * @param id ID del videojuego
   * @param descuento Porcentaje del descuento
   * @param descuentoFields Campos del descuento a actualizar
   * @returns Resultado de la actualización
   */
  @Patch(':id/descuentos/:descuento')
  updateDescuento(@Param('id') id: number, @Param('descuento') descuento: number, @Body() descuentoFields: UpdateDescuentoDto){
    return this.videoGamesService.updateDescuentoToVideoGame(descuento, descuentoFields);
  }
}
