import {
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { VideoGame } from '../entities/video-game.entity';
import { CreateVideoGameDto } from '../dto/video-games/create-video-game.dto';
import { UpdateVideoGameDto } from '../dto/video-games/update-video-game.dto';
import { VideoGameQueries } from '../dto/queries/video-game-queries.dto';
import { WhereClause } from 'typeorm/query-builder/WhereClause';
import { UsersService } from 'src/users/services/users.service';
import { Descuento } from '../entities/descuento.entity';
import { UserVideoGame } from '../entities/user-videogames.entity';
import { CreateDescuentoDto } from '../dto/descuentos/create-descuento.dto';
import { UpdateDescuentoDto } from '../dto/descuentos/update-descuento.dto';
import { Version } from '../entities/version.entity';

@Injectable()
export class VideoGamesService {
  constructor(
    @InjectRepository(VideoGame)
    private readonly videoGameRepository: Repository<VideoGame>,
    @InjectRepository(Version)
    private readonly versionRepository: Repository<Version>,
    @InjectRepository(UserVideoGame)
    private readonly userVideoGameRepository: Repository<UserVideoGame>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Busca un video juego basado en el ID recibido
   * @param id ID del videojuego a buscar
   * @returns VideoJuego encontrado
   */
  async findById(id: number) {
    const videogame = await this.videoGameRepository.findOne({
      where: { id },
      relations: ['assets', 'categorias', 'developer'],
      order: {
        assets: {
          index: 'ASC',
        },
      },
    });

    if (videogame === null) {
      throw new HttpException('Videogame was not found', HttpStatus.NOT_FOUND);
    }

    return videogame;
  }

  /**
   * Busca todos los videojuegos
   * @param queries Queries para filtrar los videojuegos
   * @returns Videojuegos encontrados
   */
  async findAll(queries: VideoGameQueries) {
    let whereConditions: FindOptionsWhere<VideoGame> = {};

    if (queries.search) {
      whereConditions.titulo = ILike(`%${queries.search}%`);
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
        assets: {
          index: 'ASC',
        },
      },
    });

    if (videoGames.length === 0) {
      throw new HttpException('Videogames was not found', HttpStatus.NOT_FOUND);
    }

    return videoGames;
  }

  /**
   * Busca los videojuegos de un usuario
   * @param userId ID del usuario
   * @returns Videojuegos del usuario
   */
  async findByUser(userId: number) {
    const user = await this.usersService.findById(userId);
    const userVideoGames = await this.userVideoGameRepository.find({
      where: { user },
      relations: ['videoGame', 'videoGame.assets'],
      order: {
        fechaCompra: 'ASC',
        videoGame: {
          assets: {
            index: 'ASC',
          },
        }
      },
    });

    if (userVideoGames.length === 0) {
      throw new HttpException('Videogames was not found', HttpStatus.NOT_FOUND);
    }

    return userVideoGames;
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

  /**
   * Agrega un videojuego a un usuario
   * @param videoGameId ID del videojuego a agregar
   * @param userId ID del usuario
   * @returns Relación creada
   */
  async addVideoGameToUser(videoGameId: number, userId: number) {
    const user = await this.usersService.findById(userId);
    const videoGame = await this.findById(videoGameId);

    return this.userVideoGameRepository.save({
      fechaCompra: new Date(),
      user,
      videoGame,
    });
  }
}
