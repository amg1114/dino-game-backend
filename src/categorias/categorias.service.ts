import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Categoria } from './categoria.entity';

import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaQueries } from './dto/categoria-queries.dto';
import { VideoGame } from 'src/video-games/entities/video-game.entity';
import slugify from 'slugify';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) {}

  /**
   * Busca y devuelve una lista de categorías según los parámetros de consulta proporcionados.
   *
   * @param urlQueries - Objeto que contiene los parámetros de consulta para filtrar y ordenar las categorías.
   *   - `limit` (opcional): Número máximo de categorías a devolver. Debe ser un número positivo.
   *   - `withgames` (opcional): Indica si se deben incluir los videojuegos relacionados con las categorías.
   *     Puede ser un booleano o una cadena que evalúe a "true" o "false".
   *   - `offset` (opcional): Número de páginas a omitir según el límite especificado. Debe ser un número no negativo.
   *   - `order` (opcional): Orden de los resultados, ya sea "ASC" (ascendente) o "DESC" (descendente).
   *   - `title` (opcional): Filtro para buscar categorías cuyo título coincida parcialmente con el valor proporcionado.
   *
   * @returns Un objeto que contiene:
   *   - `data`: Lista de categorías que cumplen con los criterios de búsqueda.
   *   - `offset`: El valor de desplazamiento utilizado en la consulta.
   *   - `total`: El número total de categorías que cumplen con los criterios de búsqueda.
   *
   * @throws `HttpException`:
   *   - Si el valor de `limit` no es un número positivo.
   *   - Si el valor de `offset` no es un número no negativo.
   *   - Si el valor de `order` no es "ASC" ni "DESC".
   *   - Si el valor de `title` no es una cadena.
   */
  async findCategorias(urlQueries: CategoriaQueries) {
    const {
      limit = null,
      withgames = false,
      offset = 0,
      order = 'ASC',
      ...queries
    } = urlQueries;

    const isWithGames =
      typeof withgames === 'string' ? withgames === 'true' : withgames;

    if (limit !== null && (typeof limit !== 'number' || limit <= 0)) {
      throw new HttpException('Invalid limit value', HttpStatus.BAD_REQUEST);
    }

    if (offset < 0 || typeof offset !== 'number') {
      throw new HttpException('Invalid offset value', HttpStatus.BAD_REQUEST);
    }

    if (order !== 'ASC' && order !== 'DESC') {
      throw new HttpException('Invalid order value', HttpStatus.BAD_REQUEST);
    }

    if (queries.title && typeof queries.title !== 'string') {
      throw new HttpException('Invalid title value', HttpStatus.BAD_REQUEST);
    }

    const queriesResult = this.categoriasRepository
      .createQueryBuilder('categoria')
      .addOrderBy('categoria.titulo', order);

    if (isWithGames) {
      queriesResult
        .leftJoinAndSelect('categoria.videoGames', 'videoGames')
        .leftJoinAndSelect('videoGames.thumb', 'thumb')
        .leftJoinAndSelect('videoGames.hero', 'hero')
        .leftJoinAndSelect('videoGames.descuentos', 'descuentos')
        .leftJoinAndSelect('videoGames.assets', 'assets')
        .addOrderBy('videoGames.titulo', order);
    }

    if (queries.title) {
      queriesResult.andWhere('categoria.titulo ILIKE :title', {
        title: `%${queries.title}%`,
      });
    }

    if (limit !== null) {
      queriesResult.take(limit).skip(offset * limit);
    }

    const categorias = await queriesResult.getMany();

    if (isWithGames) {
      categorias.forEach((categoria) => {
        categoria.videoGames.forEach((videoGame) => {
          videoGame.descuentos = videoGame.descuentos.filter((descuento) => {
            const now = new Date();
            return (
              new Date(descuento.fechaInicio) <= now &&
              new Date(descuento.fechaFin) >= now
            );
          });
        });
      });
    }

    return {
      data: categorias,
      offset: offset,
      total: await queriesResult.getCount(),
    };
  }

  /**
   * Encuentra una categoria por su ID
   * @param id ID de la categoria
   * @returns Categoria encontrada
   */
  async findCategoriaById(id: number) {
    const categoria = await this.categoriasRepository
      .createQueryBuilder('categoria')
      .leftJoinAndSelect('categoria.videoGames', 'videoGames')
      .leftJoinAndSelect('videoGames.thumb', 'thumb')
      .leftJoinAndSelect('videoGames.hero', 'hero')
      .leftJoinAndSelect('videoGames.descuentos', 'descuentos')
      .where('categoria.id = :id', { id })
      .addOrderBy('descuentos.fechaInicio', 'ASC')
      .addOrderBy('descuentos.fechaFin', 'ASC')
      .addOrderBy('asset.index', 'ASC')
      .getOne();

    if (!categoria) {
      throw new HttpException('Categoria was not found', HttpStatus.NOT_FOUND);
    }

    return categoria;
  }

  /**
   * Encuentra categorias por su ID
   * @param categoriesID IDs de las categorias
   * @returns Categorias encontradas
   */
  async findCategoriesById(categoriesID: number[]) {
    const categorias = await this.categoriasRepository.find({
      where: categoriesID.map((id) => ({ id })),
    });

    if (categorias.length !== categoriesID.length) {
      throw new HttpException('Categoria was not found', HttpStatus.NOT_FOUND);
    }

    return categorias;
  }

  async addVideoGameToCategoria(categoriaID: number, videoGame: VideoGame) {
    const categoria = await this.categoriasRepository.findOne({
      where: { id: categoriaID },
      relations: {
        videoGames: true,
      },
    });

    if (!categoria) {
      throw new HttpException('Categoria was not found', HttpStatus.NOT_FOUND);
    }

    categoria.videoGames.push(videoGame);

    return this.categoriasRepository.save(categoria);
  }

  async removeVideoGameFromCategorias(videoGameID: number) {
    const categorias = await this.categoriasRepository.find({
      relations: ['videoGames'],
    });

    const promises = categorias.map(async (categoria) => {
      categoria.videoGames = categoria.videoGames.filter(
        (videoGame) => videoGame.id !== videoGameID,
      );
      return await this.categoriasRepository.save(categoria);
    });

    return Promise.all(promises);
  }

  /**
   * Crea una nueva categoria
   * @param categoriaFields Datos de la categoria a crear
   * @returns Categoria creada
   */
  async createCategoria(categoriaFields: CreateCategoriaDto) {
    let slug = slugify(categoriaFields.titulo, {
      strict: true,
      lower: true,
      trim: true,
    });
    let existeSlug = await this.categoriasRepository.findOne({
      where: { slug },
    });
    let count = 1;

    while (existeSlug) {
      slug = `${slug}-${count}`;
      existeSlug = await this.categoriasRepository.findOne({ where: { slug } });
      count++;
    }

    const categoria = this.categoriasRepository.create({
      ...categoriaFields,
      slug,
    });

    return this.categoriasRepository.save(categoria);
  }

  /**
   * Actualiza una categoria
   * @param id ID de la categoria
   * @param categoriaFields Datos de la categoria a actualizar
   * @returns Categoria actualizada
   */
  async updateCategoria(id: number, categoriaFields: UpdateCategoriaDto) {
    const result = await this.categoriasRepository.update(id, categoriaFields);

    if (result.affected === 0) {
      throw new HttpException('Categoria was not found', HttpStatus.CONFLICT);
    }

    return result;
  }

  /**
   * Elimina una categoria
   * @param id ID de la categoria
   * @returns Resultado de la eliminación
   */
  async deleteCategoria(id: number) {
    const result = await this.categoriasRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('Categoria was not deleted', HttpStatus.CONFLICT);
    }

    return result;
  }
}
