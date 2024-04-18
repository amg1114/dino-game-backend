import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VideoGamesService } from './video-games.service';
import { CreateVideoGameDto } from './dto/create-video-game.dto';
import { UpdateVideoGameDto } from './dto/update-video-game.dto';

@Controller('video-games')
export class VideoGamesController {
  constructor(private readonly videoGamesService: VideoGamesService) {}

  // /video-games/{ id }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.videoGamesService.findById(id);
  }

  // video-games
  @Post()
  createVideoGame(@Body() videoGameFields: CreateVideoGameDto) {
    return this.videoGamesService.createVideoGame(videoGameFields);
  }

  @Patch(':id')
  updateVideoGame(
    @Param('id') id: number,
    @Body() videoGameFields: UpdateVideoGameDto,
  ) {
    return this.videoGamesService.updateVideoGame(id, videoGameFields);
  }

  @Delete(':id')
  deleteVideoGame(@Param('id') id: number) {
    return this.videoGamesService.deleteVideoGame(id);
  }
}
