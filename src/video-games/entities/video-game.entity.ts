import { AssetVideoGame } from '../../assets/asset.entity';
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

  @OneToMany(() => AssetVideoGame, (asset) => asset.videoGame, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  assets: AssetVideoGame[];

  @ManyToMany(() => Categoria, (categoria) => categoria.videoGames, {
    onDelete: 'CASCADE',
  })
  categorias: Categoria[];

  @ManyToOne(() => User, (user) => user.videoGames, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'developerId' })
  developer: User;

  @OneToMany(() => Version, (version) => version.videoGame)
  versions: Version[];

  @OneToMany(() => Descuento, (descuento) => descuento.videoGame)
  descuentos: Descuento[];

  @OneToMany(() => UserVideoGame, (userVideoGame) => userVideoGame.videoGame)
  userVideoGames: UserVideoGame[];

  @ManyToOne(() => Asset, { nullable: true })
  @JoinColumn({ name: 'thumbId' })
  thumb: Asset;

  @ManyToOne(() => Asset, { nullable: true })
  @JoinColumn({ name: 'heroId' })
  hero: Asset;
}
