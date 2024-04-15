import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import  { VideoGame } from "./videogame.entity"
@Module({imports:[TypeOrmModule.forFeature([VideoGame])]})
export class VideogamesModule {}
