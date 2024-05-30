import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOptionsUtils, FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Categoria } from './categoria.entity';

import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaQueries } from './dto/categoria-queries.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) {}

  /**
   * Encuentra todas las categorias
   * @param urlQueries Queries de la URL
   * @returns Lista de categorias
   */
  async findCategorias(urlQueries: CategoriaQueries) {
    const { limit, ...queries } = urlQueries;

    if (queries.title) {
      queries.title = Like(`%${queries.title}%`);
    }

    return this.categoriasRepository
      .createQueryBuilder('categoria')
      .leftJoinAndSelect('categoria.videoGames', 'videoGames')
      .leftJoinAndSelect('videoGames.assets', 'assets')
      .leftJoinAndSelect('assets.asset', 'asset')
      .leftJoinAndSelect('videoGames.descuentos', 'descuentos')
      .where(queries)
      .take(limit)
      .addOrderBy('asset.index', 'ASC')
      .addOrderBy('categoria.titulo', 'ASC')
      .getMany();
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
      .leftJoinAndSelect('videoGames.assets', 'assets')
      .leftJoinAndSelect('assets.asset', 'asset')
      .leftJoinAndSelect('videoGames.descuentos', 'descuentos')
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

  /**
   * Crea una nueva categoria
   * @param categoriaFields Datos de la categoria a crear
   * @returns Categoria creada
   */
  async createCategoria(categoriaFields: CreateCategoriaDto) {
    return this.categoriasRepository.save(categoriaFields);
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
