import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Noticia } from './noticia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticia)
    private readonly noticiasRepository: Repository<Noticia>,
  ) {}

  /**
   * Create a new noticia
   * @param createNoticiaDto - The data to create a new noticia
   * @returns The newly created noticia
   * @throws {HttpException} if the noticia is not created
   */
  create(createNoticiaDto: CreateNoticiaDto) {
    return this.noticiasRepository.save(createNoticiaDto);
  }

  /**
   * Get all noticias
   * @param limit - The number of noticias to return
   * @returns The list of noticias
   * @throws {HttpException} if there are no noticias
   */
  findAll(limit: number | undefined) {
    return this.noticiasRepository.find({
      take: limit,
      relations: ['assets'],
      order: {
        fecha: 'DESC',
      },
    });
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
      relations: ['assets'],
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
