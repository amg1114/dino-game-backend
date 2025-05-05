import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { VideoGame } from './video-game.entity';
import { Asset } from '../../assets/asset.entity';

@Entity('versions')
export class Version {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  version: string;

  @Column()
  descripcion: string;

  @Column()
  size: string;

  @Column()
  releaseDate: Date;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.versions, {
    onDelete: 'CASCADE',
  })
  videoGame: VideoGame;

  @OneToMany(() => Requisito, (requisito) => requisito.version, {
    eager: true,
  })
  requisitos: Requisito[];

  @OneToOne(() => Asset, { cascade: true })
  @JoinColumn()
  asset: Asset;
}

@Entity('requisitos')
export class Requisito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requisito: string;

  @ManyToOne(() => Version, (version) => version.requisitos, {
    onDelete: 'CASCADE',
  })
  version: Version;
}
