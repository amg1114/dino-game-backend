import { FindOptionsWhere, LessThanOrEqual, Like, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { VideoGame } from './video-game.entity';
import { CreateVideoGameDto } from './dto/create-video-game.dto';
import { UpdateVideoGameDto } from './dto/update-video-game.dto';
import { VideoGameQueries } from './dto/video-game-queries.dto';
import { WhereClause } from 'typeorm/query-builder/WhereClause';

@Injectable()
export class VideoGamesService {
  constructor(
    @InjectRepository(VideoGame)
    private readonly videoGameRepository: Repository<VideoGame>,
  ) {}

  /**
   * Busca un video juego basado en el ID recibido
   * @param id ID del videojuego a buscar
   * @returns VideoJuego encontrado
   */
  async findById(id: number) {
    const videogame = await this.videoGameRepository.findOne({
      where: { id },
      relations: ['assets', 'categorias'],
    });

    if (videogame === null) {
      throw new HttpException('Videogame was not found', HttpStatus.NOT_FOUND);
    }

    return videogame;
  }

  async findAll(queries: VideoGameQueries) {
    let whereConditions: FindOptionsWhere<VideoGame> = {};

    if (queries.search) {
      whereConditions.titulo = Like(`%${queries.search}%`);
    }

    if (queries.categoria) {
      const category = {
        id: queries.categoria,
      };
      whereConditions.categorias = category;
    }

    if (queries.precio) {
      whereConditions.precio = LessThanOrEqual(queries.precio);
    }

    const videoGames = await this.videoGameRepository.find({
      where: whereConditions,
      take: queries.limit,
      relations: ['assets', 'categorias'],
      order: {
        titulo: 'ASC',
      }
    });

    if (videoGames.length === 0) {
      throw new HttpException('Videogames was not found', HttpStatus.NOT_FOUND);
    }

    return videoGames;
  }

  /**
   * Crea un videojuego
   * @param videogameFields Campos del VideoJuego a crear
   * @returns VideoJuego creado
   */
  async createVideoGame(videogameFields: CreateVideoGameDto) {
    return this.videoGameRepository.save(videogameFields);
  }

  /**
   * Actualiza un videojuego
   * @param id ID del videojuego a actualizar
   * @param videogameFields Campos a actualizar
   * @returns Resultado de la actualización
   */
  async updateVideoGame(id: number, videogameFields: UpdateVideoGameDto) {
    const resultado = await this.videoGameRepository.update(
      id,
      videogameFields,
    );
    if (resultado.affected === 0) {
      throw new HttpException(
        'Videogame could not updated',
        HttpStatus.CONFLICT,
      );
    }

    return resultado;
  }

  /**
   * Elimina un videojuego
   * @param id ID del videojuego a eliminar
   * @returns Resultado de la Eliminación
   */
  async deleteVideoGame(id: number) {
    const resultado = await this.videoGameRepository.delete(id);
    if (resultado.affected === 0) {
      throw new HttpException(
        'Videogame could not deleted',
        HttpStatus.CONFLICT,
      );
    }

    return resultado;
  }
}
