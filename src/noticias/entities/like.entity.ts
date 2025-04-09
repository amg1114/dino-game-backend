import { Noticia } from './noticia.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../config/models/base-entity.entity';

@Entity('likes')
@Unique(['user', 'noticia'])
export class Like extends BaseEntity {
  @ManyToOne(() => User, (user) => user.like, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Noticia, (noticia) => noticia.like, { onDelete: 'CASCADE' })
  noticia: Noticia;
}
