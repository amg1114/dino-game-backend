import { Categoria } from '../../categorias/categoria.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Descuento } from './descuento.entity';
import { Version } from './version.entity';
import { UserVideoGame } from './user-videogames.entity';
import { User } from '../../users/entities/user.entity';
import { Asset, VideoGameAsset } from '../../assets/asset.entity';
import { Calificacion, Comentario } from './calificacion.entity';
import { Report } from '../../reports/entities/report.entity';

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

  @OneToOne(() => Asset, (asset) => asset.videoGameThumb, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  thumb: Asset;

  @OneToOne(() => Asset, (asset) => asset.videoGameHero, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  hero: Asset;

  puntaje?: number;

  @OneToMany(() => VideoGameAsset, (asset) => asset.videoGame, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  assets: VideoGameAsset[];

  @ManyToMany(() => Categoria, (categoria) => categoria.videoGames, {
    onDelete: 'CASCADE',
  })
  categorias: Categoria[];

  @ManyToOne(() => User, (user) => user.userDevelopedVideoGames, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'developerId' })
  developer: User;

  @OneToMany(() => Version, (version) => version.videoGame)
  versions: Version[];

  @OneToMany(() => Descuento, (descuento) => descuento.videoGame)
  descuentos: Descuento[];

  @OneToMany(() => UserVideoGame, (userVideoGame) => userVideoGame.videoGame)
  userVideoGames: UserVideoGame[];

  @OneToMany(() => Calificacion, (calificacion) => calificacion.videoGame)
  calificaciones: Calificacion[];

  @OneToMany(() => Comentario, (comentario) => comentario.videoGame)
  comentarios: Comentario[];

  @OneToMany(() => Report, (report) => report.videoGame)
  reports: Report[];
}
