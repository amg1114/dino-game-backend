// import { Asset } from '../assets/asset.entity';
import { Like } from './like.entity';
import { Asset } from '../../assets/asset.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../config/models/base-entity.entity';

@Entity('noticias')
export class Noticia extends BaseEntity {
  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fecha: Date;

  @Column({ unique: true })
  slug: string;

  @OneToOne(() => Asset, (asset) => asset.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'noticiaThumb' })
  thumb: Asset;

  @ManyToOne(() => User, (user) => user.noticias, { onDelete: 'CASCADE' })
  autor: User;

  @OneToMany(() => Like, (like) => like.noticia)
  like: Like[];
}
