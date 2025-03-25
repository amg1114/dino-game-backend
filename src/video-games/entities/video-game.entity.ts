import { Categoria } from '../../categorias/categoria.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Descuento } from './descuento.entity';
import { Version } from './version.entity';
import { UserVideoGame } from './user-videogames.entity';
import { User } from '../../users/entities/user.entity';
import { Asset } from '../../assets/asset.entity';

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

  @Column({ unique: true })
  slug: string;

  @ManyToOne(() => Asset, (asset) => asset.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'videoGameThumb' })
  thumb: Asset;

  @ManyToOne(() => Asset, (asset) => asset.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'videoGameHero' })
  hero: Asset;

  @ManyToMany(() => Categoria, (categoria) => categoria.videoGames, {
    onDelete: 'CASCADE',
  })
  categorias: Categoria[];

  @ManyToOne(() => User, (User) => User.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'developerId' })
  developer: User;

  @OneToMany(() => Version, (version) => version.videoGame)
  versions: Version[];

  @OneToMany(() => Descuento, (descuento) => descuento.videoGame)
  descuentos: Descuento[];

  @OneToMany(() => UserVideoGame, (userVideoGame) => userVideoGame.videoGame)
  userVideoGames: UserVideoGame[];
}
