import { Asset } from '../assets/asset.entity';
import { User } from '../users/entities/user.entity';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity, ManyToOne } from 'typeorm';

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

  @OneToMany(() => Asset, (asset) => asset.noticia)
  assets: Asset[];

  @ManyToOne(() => User, (user) => user.noticias)
  autor: User;
}
