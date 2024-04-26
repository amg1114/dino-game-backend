import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { DataSourceConfig } from './config/data.source';

import { AppService } from './app.service';

import { UsersModule } from './users/users.module';

import { VideoGamesModule } from './video-games/video-games.module';
import { AssetsModule } from './assets/assets.module';
import { CategoriasModule } from './categorias/categorias.module';
import { NoticiasModule } from './noticias/noticias.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    VideoGamesModule,
    AssetsModule,
    CategoriasModule,
    NoticiasModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
