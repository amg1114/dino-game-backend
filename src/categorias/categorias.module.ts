import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { VideoGamesModule } from 'src/video-games/video-games.module';
import { VideoGamesService } from 'src/video-games/services/video-games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria]), VideoGamesModule],
  providers: [CategoriasService, VideoGamesService],
  controllers: [CategoriasController]
})
export class CategoriasModule {}
