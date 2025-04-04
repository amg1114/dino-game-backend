import { Module } from '@nestjs/common';
import { ReportsService } from './services/reports.service';
import { ReportsController } from './controllers/reports.controller';
import { UsersModule } from '../users/users.module';
import { VideoGamesModule } from '../video-games/video-games.module';
import { TypeReportsService } from './services/type-reports.service';
import { TypeReportsController } from './controllers/type-reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { TypeReport } from './entities/type-report.entity';
import { UsersService } from 'src/users/services/users.service';
import { VideoGamesService } from 'src/video-games/services/video-games.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, TypeReport]),
    UsersModule,
    VideoGamesModule,
  ],
  exports: [TypeOrmModule, UsersModule, VideoGamesModule],
  controllers: [ReportsController, TypeReportsController],
  providers: [
    ReportsService,
    TypeReportsService,
    TypeOrmModule,
    UsersService,
    VideoGamesService,
  ],
})
export class ReportsModule {}
