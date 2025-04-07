import { Noticia } from './noticia.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('likes')
@Unique(['user', 'noticia'])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'time', default: () => 'CURRENT_TIME' })
  hora: string;

  @ManyToOne(() => User, (user) => user.like, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Noticia, (noticia) => noticia.like, { onDelete: 'CASCADE' })
  noticia: Noticia;
}
