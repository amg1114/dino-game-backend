import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoticiaDto } from '../dto/create-noticia.dto';
import { UpdateNoticiaDto } from '../dto/update-noticia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Noticia } from '../entities/noticia.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/services/users.service';
import slugify from 'slugify';
import { QueriesNoticesDto } from '../dto/queries-notices.dto';
import { Order } from 'src/config/enums/order.enum';
import { OrderBy } from 'src/config/enums/orderby.enum';
import { Like } from '../entities/like.entity';

@Injectable()
export class NoticiasService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
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
   * Retrieves a list of noticias (news) based on the provided query parameters.
   *
   * @param queries - An object containing the query parameters for filtering and sorting the noticias.
   * @param queries.order - The order in which to sort the noticias. Allowed values are 'ASC' or 'DESC'. Defaults to 'ASC'.
   * @param queries.orderBy - The field by which to sort the noticias. Allowed values are 'titulo' or 'fecha'. Defaults to 'titulo'.
   * @param queries.offset - The page offset for pagination. Defaults to 0.
   * @param queries.limit - The maximum number of noticias to retrieve per page. If null, retrieves all noticias.
   * @param queries.autor - The author of the noticias to filter by. If null, no filtering by author is applied.
   *
   * @returns An object containing the retrieved noticias, the offset, and the total count of noticias.
   *
   * @throws {HttpException} If the `order` value is invalid.
   * @throws {HttpException} If the `orderBy` value is invalid.
   * @throws {HttpException} If no noticias are found.
   */
  async findAll(queries: QueriesNoticesDto) {
    const {
      order = Order.ASC,
      orderBy = OrderBy.TITLE,
      offset = 0,
      limit = null,
      autor = null,
      search = null,
    } = queries;

    if (!Object.values(Order).includes(order.toUpperCase() as Order)) {
      throw new HttpException(
        'Invalid order value. Allowed values are ASC or DESC.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!Object.values(OrderBy).includes(orderBy.toLowerCase() as OrderBy)) {
      throw new HttpException(
        'Invalid orderBy value. Allowed values are titulo or fecha.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const queryBuilder = this.noticiasRepository
      .createQueryBuilder('noticia')
      .leftJoinAndSelect('noticia.thumb', 'thumb')

      .orderBy(`noticia.${orderBy}`, order.toUpperCase() as 'ASC' | 'DESC');

    if (autor !== null) {
      queryBuilder.andWhere('noticia.autor = :autor', { autor });
    }

    if (search) {
      queryBuilder.andWhere(
        'noticia.titulo ILIKE :search OR noticia.descripcion ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    if (limit !== null) {
      queryBuilder.take(limit).skip(offset * limit);
    }

    const [noticias, total] = await queryBuilder.getManyAndCount();

    if (!noticias.length) {
      throw new HttpException('No noticias found', HttpStatus.NOT_FOUND);
    }

    return {
      data: noticias,
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

    const cantidadLikes = await this.likeRepository
      .createQueryBuilder('like')
      .where('like.noticia_id = :id', { id })
      .getCount();

    return {
      ...noticia,
      cantidadLikes,
    };
  }

  async findBySlug(slug: string) {
    const slugNoticia = await this.noticiasRepository.findOne({
      where: { slug },
      relations: ['thumb', 'autor'],
    });

    if (!slugNoticia) {
      throw new HttpException('news not found', HttpStatus.NOT_FOUND);
    }

    const cantidadLikes = await this.likeRepository
      .createQueryBuilder('like')
      .leftJoin('like.noticia', 'noticia')
      .where('noticia.slug = :slug', { slug })
      .getCount();

    return {
      ...slugNoticia,
      cantidadLikes,
    };
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
