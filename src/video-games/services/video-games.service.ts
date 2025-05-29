import { Repository, UpdateResult } from 'typeorm';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { VideoGame } from '../entities/video-game.entity';
import { CreateVideoGameDto } from '../dto/video-games/create-video-game.dto';
import { UpdateVideoGameDto } from '../dto/video-games/update-video-game.dto';
import {
  UserVideoGameQueries,
  VideoGameQueries,
} from '../dto/queries/video-game-queries.dto';
import { UsersService } from '../../users/services/users.service';
import { UserVideoGame } from '../entities/user-videogames.entity';

import { Requisito, Version } from '../entities/version.entity';
import { AddVideoGameToUserDto } from '../dto/video-games/add-videogame-to-user.dto';
import { CategoriasService } from '../../categorias/categorias.service';
import { CreateVersionDto } from '../dto/versions/create-version.dto';
import { DevelopersService } from 'src/users/services/developers.service';
import slugify from 'slugify';
import { PaginatedDataResponse } from 'src/config/models/paginatedData-response.interface';
import { Asset } from 'src/assets/asset.entity';
import { GameOrderBy } from 'src/config/enums/orderby.enum';

@Injectable()
export class VideoGamesService {
  constructor(
    @InjectRepository(VideoGame)
    private readonly videoGameRepository: Repository<VideoGame>,
    @InjectRepository(UserVideoGame)
    private readonly userVideoGameRepository: Repository<UserVideoGame>,
    @InjectRepository(Version)
    private readonly versionRepository: Repository<Version>,
    @InjectRepository(Requisito)
    private readonly requisitosRepository: Repository<Requisito>,
    private readonly categoriasService: CategoriasService,
    private readonly usersService: UsersService,
    private readonly developersService: DevelopersService,
  ) {}

  /**
   * Busca un video juego basado en el ID recibido
   * @param id ID del videojuego a buscar
   * @returns VideoJuego encontrado
   */
  async findById(id: number) {
    const videogame = await this.videoGameRepository
      .createQueryBuilder('videoGame')
      .leftJoinAndSelect('videoGame.thumb', 'thumb')
      .leftJoinAndSelect('videoGame.hero', 'hero')
      .leftJoinAndMapMany(
        'videoGame.assets',
        Asset,
        'assets',
        'assets.videoGame = videoGame.id',
      )
      .leftJoinAndSelect('videoGame.versions', 'versions')
      .leftJoinAndSelect('versions.requisitos', 'requisitos')
      .leftJoinAndSelect('videoGame.descuentos', 'descuentos')
      .leftJoinAndSelect('videoGame.categorias', 'categorias')
      .leftJoinAndSelect('videoGame.developer', 'developer')
      .leftJoinAndSelect('videoGame.comentarios', 'comentarios')
      .leftJoinAndSelect('comentarios.user', 'userComentario')
      .where('videoGame.id = :id', { id })
      .addOrderBy('versions.createdAt', 'DESC')
      .addOrderBy('descuentos.fechaInicio', 'ASC')
      .addOrderBy('descuentos.fechaFin', 'ASC')
      .addOrderBy('categorias.titulo', 'ASC')
      .addOrderBy('comentarios.createdAt', 'DESC')
      .getOne();

    if (videogame === null) {
      throw new HttpException('Videogame was not found', HttpStatus.NOT_FOUND);
    }

    const calificaciones = await this.videoGameRepository
      .createQueryBuilder('videoGame')
      .leftJoinAndSelect('videoGame.calificaciones', 'calificaciones')
      .where('videoGame.id = :id', { id })
      .select('ROUND(AVG(calificaciones.puntaje)::numeric, 1)', 'promedio')
      .addSelect('COUNT(calificaciones.id)', 'cantidad')
      .groupBy('videoGame.id')
      .getRawOne();

    return { ...videogame, calificaciones };
  }

  /**
   *
   * @param slug Slug del videojuego a buscar
   * @returns
   */
  async findBySlug(slug: string) {
    const videogame = await this.videoGameRepository
      .createQueryBuilder('videoGame')
      .leftJoinAndSelect('videoGame.thumb', 'thumb')
      .leftJoinAndSelect('videoGame.hero', 'hero')
      .leftJoinAndSelect('videoGame.assets', 'assets')
      .leftJoinAndSelect('assets.asset', 'asset')
      .leftJoinAndSelect('videoGame.versions', 'versions')
      .leftJoinAndSelect('versions.requisitos', 'requisitos')
      .leftJoinAndSelect('videoGame.descuentos', 'descuentos')
      .leftJoinAndSelect('videoGame.categorias', 'categorias')
      .leftJoinAndSelect('videoGame.developer', 'developer')
      .leftJoinAndSelect('videoGame.comentarios', 'comentarios')
      .leftJoinAndSelect('comentarios.user', 'userComentario')
      .where('videoGame.slug = :slug', { slug })
      .addOrderBy('versions.createdAt', 'DESC')
      .addOrderBy('descuentos.fechaInicio', 'ASC')
      .addOrderBy('descuentos.fechaFin', 'ASC')
      .addOrderBy('categorias.titulo', 'ASC')
      .addOrderBy('comentarios.createdAt', 'DESC')
      .getOne();

    if (videogame === null) {
      throw new HttpException('Videogame was not found', HttpStatus.NOT_FOUND);
    }

    let assetsDestructured = [];
    if (videogame.assets && Array.isArray(videogame.assets)) {
      assetsDestructured = videogame.assets.map(
        (videoGameAsset) => videoGameAsset.asset,
      );
    }

    const calificaciones = await this.videoGameRepository
      .createQueryBuilder('videoGame')
      .leftJoinAndSelect('videoGame.calificaciones', 'calificaciones')
      .where('videoGame.slug = :slug', { slug })
      .select('ROUND(AVG(calificaciones.puntaje)::numeric, 1)', 'promedio')
      .addSelect('COUNT(calificaciones.id)', 'cantidad')
      .groupBy('videoGame.id')
      .getRawOne();

    return { ...videogame, assets: assetsDestructured, calificaciones };
  }

  /**
   * Busca un video juego basado en el slug recibido
   * @param slug Slug del videojuego a buscar
   * @returns VideoJuego encontrado
   */
  async softFindById(id: number | string) {
    return this.videoGameRepository.findOne({
      where: [
        ...(typeof id === 'number' ? [{ id }] : []),
        ...(typeof id === 'string' ? [{ slug: id }] : []),
      ],
    });
  }

  /**
   * Busca todos los videojuegos
   * @param queries Queries para filtrar los videojuegos
   * @returns Videojuegos encontrados
   */
  async findAll(
    queries: VideoGameQueries,
  ): Promise<PaginatedDataResponse<VideoGame>> {
    let videoGames = this.videoGameRepository
      .createQueryBuilder('videoGame')
      .leftJoinAndSelect('videoGame.thumb', 'thumb')
      .leftJoinAndSelect('videoGame.hero', 'hero')
      .leftJoinAndSelect('videoGame.categorias', 'categorias')
      .leftJoinAndSelect('videoGame.descuentos', 'descuentos')
      .leftJoinAndSelect('videoGame.developer', 'developer'); // Use leftJoinAndSelect for developer

    // Grouped search and developer filter
    if (queries.search && queries.developer) {
      videoGames = videoGames.andWhere(
        '(developer.id = :developer AND (videoGame.titulo ILIKE :search OR videoGame.descripcion ILIKE :search))',
        {
          developer: queries.developer,
          search: `%${queries.search}%`,
        },
      );
    } else if (queries.developer) {
      videoGames = videoGames.andWhere('developer.id = :developer', {
        developer: queries.developer,
      });
    } else if (queries.search) {
      videoGames = videoGames.andWhere(
        '(videoGame.titulo ILIKE :search OR videoGame.descripcion ILIKE :search)',
        {
          search: `%${queries.search}%`,
        },
      );
    }

    if (queries.categoria) {
      videoGames = videoGames.andWhere('categorias.slug = :categoria', {
        categoria: queries.categoria,
      });
    }

    if (queries.descuentos) {
      videoGames = videoGames.andWhere('descuentos.fechaFin >= :now', {
        now: new Date(),
      });
    }

    if (queries.onlyPaidGames) {
      videoGames = videoGames.andWhere('videoGame.precio > 0');
    }

    if (queries.precio) {
      videoGames = videoGames.andWhere('videoGame.precio <= :precio', {
        precio: queries.precio,
      });
    }

    if (!queries.orderBy) {
      videoGames = videoGames.addOrderBy(
        'videoGame.titulo',
        queries.order || 'ASC',
      );
    } else if (queries.orderBy === GameOrderBy.FEATURED) {
      videoGames = videoGames
        .leftJoin('videoGame.calificaciones', 'calificaciones')
        .addSelect('COALESCE(AVG(calificaciones.puntaje), 0)', 'puntaje')
        .groupBy('videoGame.id')
        .addGroupBy('thumb.id')
        .addGroupBy('hero.id')
        .addGroupBy('categorias.id')
        .addGroupBy('descuentos.id')
        .addGroupBy('developer.id')
        .addOrderBy(`puntaje`, queries.order || 'ASC');
    } else {
      videoGames = videoGames.addOrderBy(
        `videoGame.${queries.orderBy}`,
        queries.order || 'ASC',
      );
    }

    if (queries.limit) {
      videoGames = videoGames.take(queries.limit);
    }

    if (queries.offset) {
      videoGames = videoGames.skip(queries.offset * queries.limit);
    }

    if ((await videoGames.getCount()) === 0) {
      throw new HttpException('Videogames was not found', HttpStatus.NOT_FOUND);
    }

    let data: VideoGame[];
    let total: number;

    if (queries.orderBy === GameOrderBy.FEATURED) {
      const { raw, entities } = await videoGames.getRawAndEntities();
      data = entities.map((entity, index) => {
        const puntaje = parseFloat(raw[index]['puntaje']);
        entity.puntaje = puntaje;
        return entity;
      });
      total = data.length;
    } else {
      const result = await videoGames.getManyAndCount();
      data = result[0];
      total = result[1];
    }

    return {
      data,
      offset: queries.offset,
      total,
    };
  }

  /**
   * Busca los videojuegos de un desarrollador
   * @param developerId ID del desarrollador
   * @returns Videojuegos del desarrollador
   */
  async findDeveloperVideoGames(developerId: number) {
    const videoGames = await this.videoGameRepository
      .createQueryBuilder('videoGame')
      .leftJoinAndSelect('videoGame.thumb', 'thumb')
      .leftJoinAndSelect('videoGame.hero', 'hero')
      .leftJoinAndSelect('videoGame.descuentos', 'descuentos')
      .addOrderBy('descuentos.fechaInicio', 'ASC')
      .addOrderBy('descuentos.fechaFin', 'ASC')
      .leftJoinAndSelect('videoGame.developer', 'developer')
      .where('developer.id = :developer', { developer: developerId })
      .addOrderBy('videoGame.titulo', 'ASC')
      .getMany();

    if (videoGames.length === 0) {
      throw new HttpException('VideoGames was not found', HttpStatus.NOT_FOUND);
    }

    return videoGames;
  }

  /**
   * Busca los videojuegos de un usuario
   * @param userId ID del usuario
   * @returns Videojuegos del usuario
   */
  async findUserVideoGames(
    userId: number,
    queries: UserVideoGameQueries,
  ): Promise<PaginatedDataResponse<UserVideoGame>> {
    const { search, limit, offset } = queries;
    const user = await this.usersService.findById(userId);
    let userVideoGames = this.userVideoGameRepository
      .createQueryBuilder('userVideoGame')
      .leftJoinAndSelect('userVideoGame.videoGame', 'videoGame')
      .leftJoinAndSelect('videoGame.thumb', 'thumb')
      .leftJoinAndSelect('videoGame.categorias', 'categorias')
      .where('userVideoGame.user = :user', { user: user.id });

    if (search) {
      userVideoGames = userVideoGames.andWhere(
        'videoGame.titulo ILIKE :search OR videoGame.descripcion ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    if (limit) {
      userVideoGames = userVideoGames.take(limit);
    }

    if (offset && limit) {
      userVideoGames = userVideoGames.skip(offset * limit);
    } else if (offset) {
      throw new ConflictException('You must provide limit when using offset');
    }

    const [data, count] = await userVideoGames
      .orderBy('userVideoGame.fechaCompra', 'DESC')
      .addOrderBy('videoGame.titulo', 'ASC')
      .getManyAndCount();

    return {
      data: data,
      offset: queries.offset,
      total: count,
    };
  }

  /**
   * Busca un videojuego de un usuario
   * @param userId ID del usuario
   * @param videoGameId ID del videojuego
   * @returns Videojuego del usuario
   */
  async findUserVideoGame(userId: number, videoGameId: number) {
    const user = await this.usersService.findById(userId);
    const videoGame = await this.softFindById(+videoGameId);

    if (!videoGame) {
      throw new HttpException('Videogame was not found', HttpStatus.NOT_FOUND);
    }

    const userVideoGame = await this.userVideoGameRepository
      .createQueryBuilder('userVideoGame')
      .leftJoinAndSelect('userVideoGame.videoGame', 'videoGame')
      .leftJoinAndSelect('videoGame.thumb', 'thumb')
      .where('userVideoGame.user = :user', { user: user.id })
      .andWhere('userVideoGame.videoGame = :videoGame', {
        videoGame: videoGame.id,
      })
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
    const videoGame = await this.softFindById(+videoGameId);

    if (!videoGame) {
      throw new HttpException('Videogame was not found', HttpStatus.NOT_FOUND);
    }

    const userVideoGame = await this.userVideoGameRepository.findOne({
      where: { user, videoGame },
    });

    if (userVideoGame === null) {
      throw new HttpException('Videogame was not found', HttpStatus.NOT_FOUND);
    }

    return this.userVideoGameRepository.softDelete(userVideoGame);
  }

  /**
   * Crea un videojuego
   * @param videogameFields Campos del VideoJuego a crear
   * @returns VideoJuego creado
   */
  async createVideoGame(
    idDeveloper: number,
    videogameFields: CreateVideoGameDto,
  ) {
    let categorias = [];
    let slug = slugify(videogameFields.titulo, {
      strict: true,
      lower: true,
      trim: true,
    });
    let existeSlug = await this.videoGameRepository.findOne({
      where: { slug },
    });
    let count = 1;

    while (existeSlug) {
      slug = `${slug}-${count}`;
      existeSlug = await this.videoGameRepository.findOne({ where: { slug } });
      count++;
    }

    const developer =
      await this.developersService.getDeveloperById(idDeveloper);
    if (videogameFields.categorias) {
      categorias = videogameFields.categorias.map((id) => {
        return { id };
      });
    }

    const videoGame = this.videoGameRepository.create({
      ...videogameFields,
      categorias,
      developer,
      slug,
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
      const videoGame = await this.softFindById(+id);

      if (!videoGame) {
        throw new HttpException(
          'Videogame was not found',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.categoriasService.removeVideoGameFromCategorias(videoGame.id);
      const promises = categorias.map(async (categoria) => {
        return await this.categoriasService.addVideoGameToCategoria(
          categoria,
          videoGame,
        );
      });

      await Promise.all(promises);
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
    const resultado = await this.videoGameRepository.softDelete(id);
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
    { requisitos, ...versionFields }: CreateVersionDto,
  ) {
    const videoGame = await this.softFindById(+videoGameId);

    if (!videoGame) {
      throw new HttpException('Videogame was not found', HttpStatus.NOT_FOUND);
    }

    const version = await this.versionRepository.save({
      ...versionFields,
      videoGame,
    });

    if (requisitos) {
      requisitos.forEach(async (requisito) => {
        await this.requisitosRepository.save({
          requisito,
          version,
        });
      });
    }

    return version;
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

    if (!user) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }

    const videoGame = await this.softFindById(+videoGameId);

    if (!videoGame) {
      throw new HttpException('Videogame was not found', HttpStatus.NOT_FOUND);
    }

    return this.userVideoGameRepository.save({
      precio: compraFields.precio,
      fechaCompra: new Date(),
      user,
      videoGame,
    });
  }

  /**
   * Obtiene la cantidad de ventas y el total de ganancias de un videojuego por mes actual
   * @param id ID del videojuego a buscar
   * @param month Mes a buscar (Index entre 1 y 12)
   * @returns Ventas del videojuego
   */
  async getSalesByMonth(id: number, month: number) {
    const sales = await this.userVideoGameRepository
      .createQueryBuilder('userVideoGame')
      .select('COUNT(*)', 'cant_ventas')
      .addSelect(
        'SUM(userVideoGame.precio - userVideoGame.precio * 0.1)',
        'ganancias',
      )
      .where('userVideoGame.videoGame = :id', { id })
      .andWhere('userVideoGame.fechaCompra BETWEEN :start AND :end', {
        start: new Date(new Date().getFullYear(), month - 1, 1),
        end: new Date(new Date().getFullYear(), month, 0),
      })
      .groupBy('userVideoGame.videoGame')
      .getRawOne();

    return sales;
  }
}
