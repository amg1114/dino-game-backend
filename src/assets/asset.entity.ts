import { BaseEntity } from '../config/models/base-entity.entity';
import { Noticia } from '../noticias/entities/noticia.entity';
import { VideoGame } from '../video-games/entities/video-game.entity';
import { Version } from '../video-games/entities/version.entity';
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

  @Column()
  mimeType: string;

  @Column('float')
  size: number;

  @OneToOne(() => VideoGame, (videoGame) => videoGame.thumb)
  videoGameThumb: VideoGame;

  @OneToOne(() => VideoGame, (videoGame) => videoGame.hero)
  videoGameHero: VideoGame;

  @OneToOne(() => Noticia, (noticia) => noticia.thumb)
  noticiaThumb: Noticia;

  @OneToMany(() => VideoGameAsset, (videoGameAsset) => videoGameAsset.asset)
  videoGameAssets: VideoGameAsset[];

  @OneToOne(() => Version, (version) => version.id)
  version: Version;
}

@Entity('video_game_assets')
export class VideoGameAsset extends BaseEntity {
  @ManyToOne(() => VideoGame, (videoGame) => videoGame.assets)
  videoGame: VideoGame;

  @ManyToOne(() => Asset, (asset) => asset.videoGameAssets)
  asset: Asset;
}
