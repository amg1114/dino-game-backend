import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from '../entities/like.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/services/users.service';
import { NoticiasService } from '../services/noticias.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    private readonly usersService: UsersService,
    private readonly noticiasService: NoticiasService,
  ) {}

  /**
   *
   * @param userId Id del usuario que da el like
   * @param noticiaId id de la noticia a la cual se reacciona
   * @returns mensaje indicando si se añadió el like
   * @throws {HttpException} si no existe el usuario o la noticia
   */
  async createLike(userId: number, noticiaId: number) {
    const user = await this.usersService.findById(userId);
    const noticia = await this.noticiasService.findOne(noticiaId);

    if (!user || !noticia) {
      throw new HttpException('user or news not found', HttpStatus.NOT_FOUND);
    }

    const like = await this.likeRepository.findOne({
      where: { user: { id: userId }, noticia: { id: noticiaId } },
    });

    if (like) {
      throw new HttpException('ya existe el like', HttpStatus.CONFLICT);
    } else {
      const newLike = await this.likeRepository.create({
        user: { id: userId },
        noticia: { id: noticiaId },
      });
      await this.likeRepository.save(newLike);
      return newLike;
    }
  }

  /**
   *
   * @param userId id del usuario que ya había reaacionado a la noticia
   * @param noticiaId id de la noticia
   * @returns mensaje indicando que se eliminó la noticia ¿
   * @throws {httpException} si no existe el usuario o la noticia
   */
  async deleteLike(userId: number, noticiaId: number) {
    const user = await this.usersService.findById(userId);
    const noticia = await this.noticiasService.findOne(noticiaId);

    if (!user || !noticia) {
      throw new HttpException('User or news not found', HttpStatus.NOT_FOUND);
    }

    const like = await this.likeRepository.findOne({
      where: { user: { id: userId }, noticia: { id: noticiaId } },
    });

    if (!like) {
      throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
    } else {
      const likedeleted = await this.likeRepository.delete(like.id);
      return likedeleted;
    }
  }
}
