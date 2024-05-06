import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VideoGame } from './video-game.entity';

@Entity('versions')
export class Version {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  version: string;

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

  @Column()
  url: string;
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
