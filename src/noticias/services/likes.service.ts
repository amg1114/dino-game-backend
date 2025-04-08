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
   * @returns mensaje indicando si se añadió o eliminó el like
   * @throws {HttpException} si no existe el usuario o la noticia
   */
  async manejoLike(userId: number, noticiaId: number) {
    const user = await this.usersService.findById(userId);
    const noticia = await this.noticiasService.findOne(noticiaId);

    if (!user || !noticia) {
      throw new HttpException('user or news not found', HttpStatus.NOT_FOUND);
    }

    const like = await this.likeRepository.findOne({
      where: { user: { id: userId }, noticia: { id: noticiaId } },
    });

    if (like) {
      await this.likeRepository.remove(like);
      return 'Se eliminó el like';
    } else {
      const newLike = await this.likeRepository.create({
        user: { id: userId },
        noticia: { id: noticiaId },
      });
      await this.likeRepository.save(newLike);
      return 'Se añadió el like al post';
    }
  }

  /**
   *
   * @param likeId id del like
   * @returns datos del like buscado
   */
  async findoneLike(likeId: number) {
    const like = await this.likeRepository.findOne({ where: { id: likeId } });

    if (!like) {
      throw new HttpException('like not found', HttpStatus.NOT_FOUND);
    }
    return like;
  }
}
