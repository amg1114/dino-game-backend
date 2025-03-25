import { Noticia } from '../noticias/noticia.entity';
import { VideoGame } from '..//video-games/entities/video-game.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ default: 0 })
  index: number;

  @OneToMany(() => VideoGame, (videoGame) => videoGame.thumb)
  videoGameThumb: VideoGame;

  @OneToMany(() => VideoGame, (videoGame) => videoGame.hero)
  videoGameHero: VideoGame;

  @OneToMany(() => Noticia, (noticia) => noticia.thumb)
  noticiaThumb: Noticia;
}
