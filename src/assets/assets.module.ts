import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { VideoGamesModule } from 'src/video-games/video-games.module';
import { VideoGamesService } from 'src/video-games/video-games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asset]), VideoGamesModule],
  providers: [AssetsService, VideoGamesService],
  controllers: [AssetsController]
})
export class AssetsModule {}
