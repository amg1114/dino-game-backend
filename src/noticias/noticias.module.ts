import { Module } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';

@Module({
  providers: [NoticiasService],
  controllers: [NoticiasController]
})
export class NoticiasModule {}
