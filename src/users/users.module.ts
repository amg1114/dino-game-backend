import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator, Developer, User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({imports:[TypeOrmModule.forFeature([User, Administrator, Developer])], providers: [UsersService], controllers: [UsersController]})
export class UsersModule {}
