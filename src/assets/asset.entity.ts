import { BaseEntity } from '../config/models/base-entity.entity';
import { Noticia } from '../noticias/entities/noticia.entity';
import { VideoGame } from '../video-games/entities/video-game.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @OneToOne(() => VideoGame, (videoGame) => videoGame.thumb)
  videoGameThumb: VideoGame;

  @OneToOne(() => VideoGame, (videoGame) => videoGame.hero)
  videoGameHero: VideoGame;

  @OneToOne(() => Noticia, (noticia) => noticia.thumb)
  noticiaThumb: Noticia;

  @OneToMany(() => VideoGameAsset, (videoGameAsset) => videoGameAsset.asset)
  videoGameAssets: VideoGameAsset[];
}

@Entity('video_game_assets')
export class VideoGameAsset extends BaseEntity {
  @ManyToOne(() => VideoGame, (videoGame) => videoGame.assets)
  videoGame: VideoGame;

  @ManyToOne(() => Asset, (asset) => asset.id)
  asset: Asset;
}
