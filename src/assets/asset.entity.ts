import { Noticia } from '../noticias/noticia.entity';
import { VideoGame } from '../video-games/entities/video-game.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';

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

  // Relación inversa para el campo thumb en VideoGame
  @OneToOne(() => VideoGame, (videoGame) => videoGame.thumb)
  videoGameThumb: VideoGame;

  // Relación inversa para el campo hero en VideoGame
  @OneToOne(() => VideoGame, (videoGame) => videoGame.hero)
  videoGameHero: VideoGame;

  // Relación inversa para el campo thumb en Noticia
  @OneToOne(() => Noticia, (noticia) => noticia.thumb)
  noticiaThumb: Noticia;
}

@Entity('assets_videogames')
export class AssetVideoGame {
  @PrimaryColumn()
  assetID: number;

  @OneToOne(() => Asset, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assetID' })
  asset: Asset;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.assets, {
    onDelete: 'CASCADE',
  })
  videoGame: VideoGame;
}

@Entity('assets_noticias')
export class AssetNoticia {
  @PrimaryColumn()
  assetID: number;

  @OneToOne(() => Asset, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assetID' })
  asset: Asset;

  @ManyToOne(() => Noticia, (noticia) => noticia.assets, {
    onDelete: 'CASCADE',
  })
  noticia: Noticia;
}
