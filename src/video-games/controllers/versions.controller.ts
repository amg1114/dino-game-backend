import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateVersionDto } from '../dto/versions/create-version.dto';
import { VideoGamesService } from '../services/video-games.service';

@Controller('video-games/:videogame/versions')
export class VersionsController {
  constructor(private readonly videoGamesService: VideoGamesService) {}

  /**
   * Crea una nueva versión para un videojuego
   * @param videogame ID del videojuego al que se le agregará la versión
   * @param createVersionDto Datos de la versión a crear
   * @returns Versión creada
   */
  @Post()
  create(
    @Param('videogame') videogame: number,
    @Body() createVersionDto: CreateVersionDto,
  ) {
    return this.videoGamesService.createVideoGameVersion(
      videogame,
      createVersionDto,
    );
  }
}
