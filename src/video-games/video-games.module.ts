import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoGame } from './video-game.entity';
import { VideoGamesService } from './video-games.service';
import { VideoGamesController } from './video-games.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VideoGame])],
  providers: [VideoGamesService],
  controllers: [VideoGamesController],
  exports: [TypeOrmModule, VideoGamesService],
})
export class VideoGamesModule {}
