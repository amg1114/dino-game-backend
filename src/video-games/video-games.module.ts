import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideoGame } from './entities/video-game.entity';
import { UserVideoGame } from './entities/user-videogames.entity';
import { Requisito, Version } from './entities/version.entity';

import { Descuento } from './entities/descuento.entity';
import { DescuentosController } from './controllers/descuentos.controller';

import { VideoGamesService } from './services/video-games.service';
import { VideoGamesController } from './controllers/video-games.controller';
import { UsersModule } from '../users/users.module';

import { UsersService } from '../users/services/users.service';
import { DescuentosService } from './services/descuentos.service';
import { BibliotecaController } from './controllers/biblioteca.controller';
import { CategoriasModule } from '../categorias/categorias.module';
import { CategoriasService } from '../categorias/categorias.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VideoGame,
      Version,
      Requisito,
      Descuento,
      UserVideoGame,
    ]),
    UsersModule,
    CategoriasModule
  ],
  providers: [VideoGamesService, UsersService, DescuentosService, CategoriasService],
  controllers: [BibliotecaController, VideoGamesController, DescuentosController],
  exports: [TypeOrmModule, VideoGamesService, UsersService, CategoriasModule],
})
export class VideoGamesModule {}
