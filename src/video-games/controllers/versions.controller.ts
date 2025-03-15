import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateVersionDto } from '../dto/versions/create-version.dto';
import { VideoGamesService } from '../services/video-games.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VideoGame } from '../entities/video-game.entity';

@ApiTags('Versions')
@Controller('video-games/:videogame/versions')
export class VersionsController {
  constructor(private readonly videoGamesService: VideoGamesService) {}

  /**
   * Crea una nueva versión para un videojuego
   * @param videogame ID del videojuego al que se le agregará la versión
   * @param createVersionDto Datos de la versión a crear
   * @returns Versión creada
   */
  @ApiOperation({
    summary: 'Crear una nueva version para un videojuego',
    description: 'Agrega una nueva version a un videojuego',
  })
  @ApiResponse({
    status: 200,
    description: 'La nueva version fue agregada exitosamente',
    type: VideoGame,
  })
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
