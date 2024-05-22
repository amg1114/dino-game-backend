import {
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  Repository,
  UpdateResult,
} from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { VideoGame } from '../entities/video-game.entity';
import { CreateVideoGameDto } from '../dto/video-games/create-video-game.dto';
import { UpdateVideoGameDto } from '../dto/video-games/update-video-game.dto';
import { VideoGameQueries } from '../dto/queries/video-game-queries.dto';
import { UsersService } from '../../users/services/users.service';
import { UserVideoGame } from '../entities/user-videogames.entity';

import { Version } from '../entities/version.entity';
import { AddVideoGameToUserDto } from '../dto/video-games/add-videogame-to-user.dto';
import { CategoriasService } from '../../categorias/categorias.service';
import { CreateVersionDto } from '../dto/versions/create-version.dto';

@Injectable()
export class VideoGamesService {
  constructor(
    @InjectRepository(VideoGame)
    private readonly videoGameRepository: Repository<VideoGame>,
    @InjectRepository(UserVideoGame)
    private readonly userVideoGameRepository: Repository<UserVideoGame>,
    @InjectRepository(Version)
    private readonly versionRepository: Repository<Version>,
    private readonly categoriasService: CategoriasService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Busca un video juego basado en el ID recibido
   * @param id ID del videojuego a buscar
   * @returns VideoJuego encontrado
   */
  async findById(id: number) {
    const videogame = await this.videoGameRepository
      .createQueryBuilder('videoGame')
      .leftJoinAndSelect('videoGame.assets', 'assets')
      .leftJoinAndSelect('assets.asset', 'asset')
      .leftJoinAndSelect('videoGame.versions', 'versions')
      .leftJoinAndSelect('versions.requisitos', 'requisitos')
      .leftJoinAndSelect('videoGame.descuentos', 'descuentos')
      .leftJoinAndSelect('videoGame.categorias', 'categorias')
      .leftJoinAndSelect('videoGame.developer', 'developer')
      .leftJoinAndSelect('developer.user', 'user')
      .where('videoGame.id = :id', { id })
      .getOne();

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
    let videoGames = this.videoGameRepository
      .createQueryBuilder('videoGame')
      .leftJoinAndSelect('videoGame.assets', 'assets')
      .leftJoinAndSelect('assets.asset', 'asset')
      .leftJoinAndSelect('videoGame.categorias', 'categorias')
      .leftJoinAndSelect('videoGame.developer', 'developer')
      .leftJoinAndSelect('developer.user', 'user');

    if (queries.search) {
      videoGames = videoGames.where('videoGame.titulo ILIKE :search', {
        search: `%${queries.search}%`,
      });
    }

    if (queries.categoria) {
      videoGames = videoGames.andWhere('categorias.id = :categoria', {
        categoria: queries.categoria,
      });
    }

    if (queries.precio) {
      videoGames = videoGames.andWhere('videoGame.precio <= :precio', {
        precio: queries.precio,
      });
    }

    if (await videoGames.getCount() === 0) {
      throw new HttpException('Videogames was not found', HttpStatus.NOT_FOUND);
    }

    return videoGames.getMany();
  }

  /**
   * Busca los videojuegos de un usuario
   * @param userId ID del usuario
   * @returns Videojuegos del usuario
   */
  async findUserVideoGames(userId: number) {
    const user = await this.usersService.findById(userId);
    const userVideoGames = await this.userVideoGameRepository
      .createQueryBuilder('userVideoGame')
      .leftJoinAndSelect('userVideoGame.videoGame', 'videoGame')
      .leftJoinAndSelect('videoGame.assets', 'assets')
      .leftJoinAndSelect('assets.asset', 'asset')
      .leftJoinAndSelect('videoGame.descuentos', 'descuentos')
      .where('userVideoGame.user = :user', { user })
      .addOrderBy('asset.index', 'ASC')
      .getMany();

    if (userVideoGames.length === 0) {
      throw new HttpException('Videogames was not found', HttpStatus.NOT_FOUND);
    }

    return userVideoGames;
  }

  /**
   * Busca un videojuego de un usuario
   * @param userId ID del usuario
   * @param videoGameId ID del videojuego
   * @returns Videojuego del usuario
   */
  async findUserVideoGame(userId: number, videoGameId: number) {
    const user = await this.usersService.findById(userId);
    const videoGame = await this.findById(videoGameId);

    const userVideoGame = await this.userVideoGameRepository
      .createQueryBuilder('userVideoGame')
      .leftJoinAndSelect('userVideoGame.videoGame', 'videoGame')
      .leftJoinAndSelect('videoGame.assets', 'assets')
      .leftJoinAndSelect('assets.asset', 'asset')
      .leftJoinAndSelect('videoGame.versions', 'versions')
      .leftJoinAndSelect('versions.requisitos', 'requisitos')
      .leftJoinAndSelect('videoGame.descuentos', 'descuentos')
      .leftJoinAndSelect('videoGame.categorias', 'categorias')
      .leftJoinAndSelect('videoGame.developer', 'developer')
      .leftJoinAndSelect('developer.user', 'user')
      .where('userVideoGame.user = :user', { user })
      .andWhere('userVideoGame.videoGame = :videoGame', { videoGame })
      .getOne();

    if (userVideoGame === null) {
      throw new HttpException('Videogame was not found', HttpStatus.NOT_FOUND);
    }

    return userVideoGame;
  }

  /**
   * Elimina un videojuego de un usuario
   * @param userId ID del usuario
   * @param videoGameId ID del videojuego
   * @returns Resultado de la eliminación
   */
  async deleteUserVideoGame(userId: number, videoGameId: number) {
    const user = await this.usersService.findById(userId);
    const videoGame = await this.findById(videoGameId);

    const userVideoGame = await this.userVideoGameRepository.findOne({
      where: { user, videoGame },
    });

    if (userVideoGame === null) {
      throw new HttpException('Videogame was not found', HttpStatus.NOT_FOUND);
    }

    return this.userVideoGameRepository.delete(userVideoGame);
  }

  /**
   * Crea un videojuego
   * @param videogameFields Campos del VideoJuego a crear
   * @returns VideoJuego creado
   */
  async createVideoGame(videogameFields: CreateVideoGameDto) {
    let categorias = [];
    if (videogameFields.categorias) {
      categorias = videogameFields.categorias.map((id) => {
        return { id };
      });
    }
    const videoGame = this.videoGameRepository.create({
      ...videogameFields,
      categorias,
    });
    return this.videoGameRepository.save(videoGame);
  }

  /**
   * Actualiza un videojuego
   * @param id ID del videojuego a actualizar
   * @param videogameFields Campos a actualizar
   * @returns Resultado de la actualización
   */
  async updateVideoGame(
    id: number,
    { categorias, ...videogameFields }: UpdateVideoGameDto,
  ) {
    let resultado = new UpdateResult();

    if (Object.keys(videogameFields).length > 0) {
      resultado = await this.videoGameRepository.update(id, videogameFields);
      if (resultado.affected === 0) {
        throw new HttpException(
          'Videogame could not updated',
          HttpStatus.CONFLICT,
        );
      }
    }

    if (categorias) {
      const videoGame = await this.findById(id);

      videoGame.categorias =
        await this.categoriasService.findCategoriesById(categorias);
      await this.videoGameRepository.save(videoGame);

      resultado.affected = 1;
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
   * Crea un descuento para un videojuego
   * @param videoGameId ID del videojuego
   * @param descuentoFields Campos del descuento
   * @returns Descuento creado
   */
  async createVideoGameVersion(
    videoGameId: number,
    versionFields: CreateVersionDto,
  ) {
    const videoGame = await this.findById(videoGameId);
    const version = this.versionRepository.create({
      ...versionFields,
      videoGame,
    });
    return this.versionRepository.save(version);
  }

  /**
   * Agrega un videojuego a un usuario
   * @param videoGameId ID del videojuego a agregar
   * @param userId ID del usuario
   * @returns Relación creada
   */
  async addVideoGameToUser(
    videoGameId: number,
    userId: number,
    compraFields: AddVideoGameToUserDto,
  ) {
    const user = await this.usersService.findById(userId);
    const videoGame = await this.findById(videoGameId);

    return this.userVideoGameRepository.save({
      precio: compraFields.precio,
      fechaCompra: new Date(),
      user,
      videoGame,
    });
  }
}
