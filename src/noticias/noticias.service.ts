import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Noticia } from './noticia.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/services/users.service';

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
    const author = await this.usersService.findById(autorId);
    const noticia = this.noticiasRepository.create(createNoticiaDto);
    noticia.autor = author;

    return this.noticiasRepository.save(noticia);
  }

  /**
   * Get all noticias
   * @param limit - The number of noticias to return
   * @returns The list of noticias
   * @throws {HttpException} if there are no noticias
   */
  async findAll(limit: number | undefined) {
    const noticias = await this.noticiasRepository
      .createQueryBuilder('noticia')
      .leftJoinAndSelect('noticia.assets', 'assets')
      .leftJoinAndSelect('assets.asset', 'asset')
      .addOrderBy('asset.index', 'ASC')
      .addOrderBy('noticia.fecha', 'DESC')
      .take(limit)
      .getMany();

    if (!noticias.length) {
      throw new HttpException('No noticias found', HttpStatus.NOT_FOUND);
    }

    return noticias;
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
      relations: ['assets', 'assets.asset'],
    });

    if (!noticia) {
      throw new HttpException('Noticia not found', HttpStatus.NOT_FOUND);
    }
    return noticia;
  }

  /**
   * Get noticias by autor
   * @param autor The id of the autor
   * @returns The noticias by the given autor
   * @throws {HttpException} if there are no noticias
   */
  async findByAutor(autor: number) {
    const noticias = await this.noticiasRepository.createQueryBuilder('noticia')
      .leftJoinAndSelect('noticia.autor', 'autor')
      .leftJoinAndSelect('noticia.assets', 'assets')
      .leftJoinAndSelect('assets.asset', 'asset')
      .where('autor.id = :autor', { autor })
      .addOrderBy('asset.index', 'ASC')
      .getMany();

    if (!noticias.length) {
      throw new HttpException('No noticias found', HttpStatus.NOT_FOUND);
    }

    return noticias;
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
