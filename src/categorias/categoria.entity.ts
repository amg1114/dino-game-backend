import slugify from 'slugify';
import { VideoGame } from '../video-games/entities/video-game.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ unique: true })
  slug: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.titulo, { strict: true, lower: true, trim: true });
  }

  @ManyToMany(() => VideoGame, (videoGame) => videoGame.categorias)
  @JoinTable({
    name: 'categorias_videogames',
  })
  videoGames: VideoGame[];
}
