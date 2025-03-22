import { AssetVideoGame } from '../../assets/asset.entity';
import { Categoria } from '../../categorias/categoria.entity';
import {
  BeforeInsert,
  BeforeUpdate,
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
import slugify from 'slugify';

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

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.titulo, { strict: true, lower: true, trim: true });
  }

  @OneToMany(() => AssetVideoGame, (asset) => asset.videoGame, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  assets: AssetVideoGame[];

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
