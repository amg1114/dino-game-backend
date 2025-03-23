import { AssetNoticia } from '../assets/asset.entity';
import { User } from '../users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Entity,
  ManyToOne,
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

  @OneToMany(() => AssetNoticia, (asset) => asset.noticia)
  assets: AssetNoticia[];

  @ManyToOne(() => User, (user) => user.noticias)
  autor: User;
}
