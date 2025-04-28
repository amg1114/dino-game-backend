import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SolicitudDesarrollador } from './entities/solicitud-desarrollador.entity';
import { DevelopersController } from './controllers/developers.controller';
import { DevelopersService } from './services/developers.service';
import { VideoGame } from 'src/video-games/entities/video-game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SolicitudDesarrollador, VideoGame]),
  ],
  providers: [UsersService, DevelopersService],
  controllers: [DevelopersController, UsersController],
  exports: [UsersModule, TypeOrmModule],
})
export class UsersModule {}
