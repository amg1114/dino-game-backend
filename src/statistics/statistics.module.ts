import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoGame } from 'src/video-games/entities/video-game.entity';
import { UserVideoGame } from 'src/video-games/entities/user-videogames.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoGame, UserVideoGame]), UsersModule],
  controllers: [StatisticsController],
  providers: [StatisticsService, UsersService],
})
export class StatisticsModule {}
