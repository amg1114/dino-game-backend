import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideoGame } from './entities/video-game.entity';
import { UserVideoGame } from './entities/user-videogames.entity';
import { Requisito, Version } from './entities/version.entity';

import { Descuento } from './entities/descuento.entity';
import { DescuentosController } from './controllers/descuentos.controller';

import { VideoGamesService } from './services/video-games.service';
import { VideoGamesController } from './controllers/video-games.controller';
import { UsersModule } from 'src/users/users.module';

import { UsersService } from 'src/users/services/users.service';
import { DescuentosService } from './services/descuentos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VideoGame,
      Version,
      Requisito,
      Descuento,
      UserVideoGame,
    ]),
    UsersModule
  ],
  providers: [VideoGamesService, UsersService, DescuentosService],
  controllers: [VideoGamesController, DescuentosController],
  exports: [TypeOrmModule, VideoGamesService, UsersService],
})
export class VideoGamesModule {}
