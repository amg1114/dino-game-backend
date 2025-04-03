// import { Asset } from '../assets/asset.entity';
import { Asset } from '../assets/asset.entity';
import { User } from '../users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('noticias')
export class Noticia {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => User, (user) => user.noticias)
  autor: User;
}
