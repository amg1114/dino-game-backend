import { FindOptionsWhere, ILike, LessThanOrEqual, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { VideoGame } from '../entities/video-game.entity';
import { CreateVideoGameDto } from '../dto/video-games/create-video-game.dto';
import { UpdateVideoGameDto } from '../dto/video-games/update-video-game.dto';
import { VideoGameQueries } from '../dto/queries/video-game-queries.dto';
import { UsersService } from 'src/users/services/users.service';
import { Descuento } from '../entities/descuento.entity';
import { UserVideoGame } from '../entities/user-videogames.entity';
import { CreateDescuentoDto } from '../dto/descuentos/create-descuento.dto';
import { UpdateDescuentoDto } from '../dto/descuentos/update-descuento.dto';
import { Version } from '../entities/version.entity';
import { AddVideoGameToUserDto } from '../dto/video-games/add-videogame-to-user.dto';
import { CategoriasService } from 'src/categorias/categorias.service';

@Injectable()
export class VideoGamesService {
  constructor(
    @InjectRepository(VideoGame)
    private readonly videoGameRepository: Repository<VideoGame>,
    @InjectRepository(UserVideoGame)
    private readonly userVideoGameRepository: Repository<UserVideoGame>,
    private readonly categoriasService: CategoriasService,
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
      relations: [
        'assets',
        'categorias',
        'developer',
        'developer.user',
        'versions',
        'versions.requisitos',
        'descuentos',
      ],
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

    const videoGames = await this.videoGameRepository
      .createQueryBuilder('videoGame')
      .leftJoinAndSelect('videoGame.assets', 'assets')
      .leftJoinAndSelect('videoGame.categorias', 'categorias')
      .leftJoinAndSelect('videoGame.developer', 'developer')
      .leftJoinAndSelect('developer.user', 'user')
      .addOrderBy('assets.index', 'ASC')
      .addOrderBy('categorias.titulo', 'ASC')
      .addOrderBy('videoGame.titulo', 'ASC')
      .where(whereConditions)
      .take(queries.limit)
      .getMany();

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
  async findUserVideoGames(userId: number) {
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
        },
      },
    });

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

    const userVideoGame = await this.userVideoGameRepository.findOne({
      where: { user, videoGame },
      relations: ['videoGame', 'videoGame.assets'],
      order: {
        videoGame: {
          assets: {
            index: 'ASC',
          },
        },
      },
    });

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

    if (categorias) {
      const videoGame = await this.findById(id);

       videoGame.categorias = await Promise.all(
        categorias.map((id) => this.categoriasService.findCategoriaById(id))
      );
      await this.videoGameRepository.save(videoGame);
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
