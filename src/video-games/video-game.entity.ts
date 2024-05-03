import { Asset } from 'src/assets/asset.entity';
import { Categoria } from 'src/categorias/categoria.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('videogames')
export class VideoGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  precio: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ type: 'date' })
  fechaLanzamiento: Date;

  @OneToMany(() => Asset, (asset) => asset.videoGame)
  assets: Asset[];

  @ManyToMany(() => Categoria, categoria=>categoria.videoGames)
  categorias: Categoria[];
}
