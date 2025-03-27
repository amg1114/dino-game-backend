import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Noticia } from './noticia.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/services/users.service';
import slugify from 'slugify';
import { QueriesNoticesDto } from './dto/queries-notices.dto';

@Injectable()
export class NoticiasService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Noticia)
    private readonly noticiasRepository: Repository<Noticia>,
  ) {}

  /**
   * Create a new noticia
   * @param createNoticiaDto - The data to create a new noticia
   * @returns The newly created noticia
   * @throws {HttpException} if the noticia is not created
   */
  async create(autorId: number, createNoticiaDto: CreateNoticiaDto) {
    let slug = slugify(createNoticiaDto.titulo, {
      strict: true,
      lower: true,
      trim: true,
    });
    let existeSlug = await this.noticiasRepository.findOne({ where: { slug } });
    let count = 1;

    while (existeSlug) {
      slug = `${slug}-${count}`;
      existeSlug = await this.noticiasRepository.findOne({ where: { slug } });
      count++;
    }

    const author = await this.usersService.findById(autorId);
    const noticia = this.noticiasRepository.create({
      ...createNoticiaDto,
      slug,
    });
    noticia.autor = author;

    return this.noticiasRepository.save(noticia);
  }

  /**
   * Get all noticias
   * @param limit - The number of noticias to return
   * @returns The list of noticias
   * @throws {HttpException} if there are no noticias
   */
  async findAll(queries: QueriesNoticesDto) {
    const {
      order = 'ASC',
      orderBy = 'titulo',
      offset = 0,
      limit = null,
      autor = null,
    } = queries;

    if (!['ASC', 'DESC'].includes(order.toUpperCase())) {
      throw new HttpException(
        'Invalid order value. Allowed values are ASC or DESC.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!['titulo', 'fecha'].includes(orderBy)) {
      throw new HttpException(
        'Invalid orderBy value. Allowed values are titulo or fecha.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const queryBuilder = this.noticiasRepository
      .createQueryBuilder('noticia')
      .leftJoinAndSelect('noticia.thumb', 'thumb')

      .orderBy(`noticia.${orderBy}`, order.toUpperCase() as 'ASC' | 'DESC')
      .skip(offset);

    if (autor !== null) {
      queryBuilder.andWhere('noticia.autor = :autor', { autor });
    }

    if (limit !== null) {
      queryBuilder.take(limit);
    }

    const [noticias, total] = await queryBuilder.getManyAndCount();

    if (!noticias.length) {
      throw new HttpException('No noticias found', HttpStatus.NOT_FOUND);
    }

    return {
      items: noticias,
      offset,
      total,
    };
  }

  /**
   * Get a noticia by id
   * @param id The id of the noticia
   * @returns The noticia with the given id
   * @throws {HttpException} if the noticia is not found
   */
  async findOne(id: number) {
    const noticia = await this.noticiasRepository.findOne({
      where: { id },
      relations: ['thumb'],
    });

    if (!noticia) {
      throw new HttpException('Noticia not found', HttpStatus.NOT_FOUND);
    }
    return noticia;
  }

  /**
   * Update a noticia by id
   * @param id The id of the noticia
   * @param updateNoticiaDto The data to update the noticia
   * @returns The update result
   * @throws {HttpException} if the noticia is not found
   */
  async update(id: number, updateNoticiaDto: UpdateNoticiaDto) {
    const result = await this.noticiasRepository.update(id, updateNoticiaDto);
    if (result.affected === 0) {
      throw new HttpException('Noticia not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  /**
   * Delete a noticia by id
   * @param id The id of the noticia
   * @returns The delete result
   * @throws {HttpException} if the noticia is not found
   */
  async remove(id: number) {
    const result = await this.noticiasRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Noticia not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
