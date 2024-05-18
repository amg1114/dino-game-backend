import { Asset } from 'src/assets/asset.entity';
import { Categoria } from 'src/categorias/categoria.entity';
import { Developer } from 'src/users/entities/user.entity';
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

  @ManyToMany(() => Categoria, categoria=>categoria.videoGames, {onDelete: 'CASCADE', eager: true})
  categorias: Categoria[];

  @ManyToOne(()=>Developer, developer=>developer.videoGames, {onDelete: 'CASCADE', eager: true})
  developer: Developer;

  @OneToMany(() => Version, version => version.videoGame, {eager: true})
  versions: Version[];

  @OneToMany(() => Descuento, descuento => descuento.videoGame, {eager: true})
  descuentos: Descuento[];

  @OneToMany(() => UserVideoGame, userVideoGame => userVideoGame.videoGame,)
  userVideoGames: UserVideoGame[];
}
