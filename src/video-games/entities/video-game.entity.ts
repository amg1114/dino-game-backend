import { Asset } from '../../assets/asset.entity';
import { Categoria } from '../../categorias/categoria.entity';
import { Developer } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Descuento } from './descuento.entity';
import { Version } from './version.entity';
import { UserVideoGame } from './user-videogames.entity';

@Entity('videogames')
export class VideoGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  precio: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ type: 'date' })
  fechaLanzamiento: Date;

  @OneToMany(() => Asset, (asset) => asset.videoGame)
  assets: Asset[];

  @ManyToMany(() => Categoria, (categoria) => categoria.videoGames, {onDelete: 'CASCADE'})
  categorias: Categoria[];

  @ManyToOne(() => Developer, (developer) => developer.videoGames, {onDelete: 'CASCADE'})
  developer: Developer;

  @OneToMany(() => Version, (version) => version.videoGame)
  versions: Version[];

  @OneToMany(() => Descuento, (descuento) => descuento.videoGame)
  descuentos: Descuento[];

  @OneToMany(() => UserVideoGame, (userVideoGame) => userVideoGame.videoGame)
  userVideoGames: UserVideoGame[];
}
