import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset, VideoGameAsset } from './asset.entity';
import { VideoGamesModule } from '../video-games/video-games.module';
import { NoticiasModule } from '../noticias/noticias.module';
import { NoticiasService } from '../noticias/services/noticias.service';
import { FirebaseService } from './services/firebase.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asset, VideoGameAsset]),
    VideoGamesModule,
    NoticiasModule,
  ],
  providers: [AssetsService, NoticiasService, FirebaseService],
  controllers: [AssetsController],
  exports: [AssetsService],
})
export class AssetsModule {}
