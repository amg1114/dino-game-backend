import { Module } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticia } from './noticia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Noticia])],
  providers: [NoticiasService],
  exports: [TypeOrmModule],
  controllers: [NoticiasController]
})
export class NoticiasModule {}
