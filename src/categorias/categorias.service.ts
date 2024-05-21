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

  findCategorias(urlQueries: CategoriaQueries) {
    const { limit, ...queries } = urlQueries;

    if (queries.title) {
      queries.title = Like(`%${queries.title}%`);
    }

    return this.categoriasRepository.createQueryBuilder('categoria')
      .leftJoinAndSelect('categoria.videoGames', 'videoGames')
      .leftJoinAndSelect('videoGames.assets', 'assets')
      .leftJoinAndSelect('assets.asset', 'assets')
      .leftJoinAndSelect('videoGames.descuentos', 'descuentos')
      .where(queries)
      .take(limit)
      .addOrderBy('asset.index', 'ASC')
      .addOrderBy('categoria.titulo', 'ASC')
      .getMany();
  }

  async findCategoriaById(id: number) {
    const categoria = await this.categoriasRepository.createQueryBuilder('categoria')
      .leftJoinAndSelect('categoria.videoGames', 'videoGames')
      .leftJoinAndSelect('videoGames.assets', 'assets')
      .leftJoinAndSelect('videoGames.descuentos', 'descuentos')
      .where('categoria.id = :id', { id })
      .getOne();

    if (!categoria) {
      throw new HttpException('Categoria was not found', HttpStatus.NOT_FOUND);
    }

    return categoria;
  }

  async createCategoria(categoriaFields: CreateCategoriaDto) {
    return this.categoriasRepository.save(categoriaFields);
  }

  async updateCategoria(id: number, categoriaFields: UpdateCategoriaDto) {
    const result = await this.categoriasRepository.update(id, categoriaFields);

    if (result.affected === 0) {
      throw new HttpException('Categoria was not found', HttpStatus.CONFLICT);
    }

    return result;
  }

  async deleteCategoria(id: number) {
    const result = await this.categoriasRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('Categoria was not deleted', HttpStatus.CONFLICT);
    }

    return result;
  }
}
