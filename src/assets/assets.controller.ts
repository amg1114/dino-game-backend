import {
  Controller,
  Delete,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import {
  ImageNotFoundResponseDto,
  VersionNotFoundResponseDto,
} from './dto/responses-dto';
import { DeleteResultResponseDto } from 'src/config/responses-dto';
import { Asset } from './asset.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTypeValidator } from './validators/filte-type.validator';
import { FileRatioValidator } from './validators/file-ratio.validator';
import { VideoGamesService } from '../video-games/services/video-games.service';

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly videoGamesService: VideoGamesService,
  ) {}

  /**
   * EndPoint para crear el asset para un videojuego
   * @param id id del videojuego
   * @param field campo del asset que se va a crear [thumb, hero, asset]
   * @param file archivo que se va a subir
   * @returns el asset del videojuego creado
   */
  @ApiOperation({
    summary: 'Crear un asset para un videojuego',
    description: 'Crea un asset para un videojuego en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'La imagen fue creada exitosamente',
    type: Asset,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('video-games/:videogame/:field')
  createVideoGameAsset(
    @Param('videogame', ParseIntPipe) id: number,
    @Param('field') field: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator(), new FileRatioValidator()],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.assetsService.createVideoGameAsset(id, file, field);
  }

  /**
   * EndPoint para crear el asset para una noticia
   * @param id id de la noticia
   * @param file archivo que se va a subir
   * @returns el asset de la noticia creado
   */
  @ApiOperation({
    summary: 'Crear un asset para una noticia',
    description: 'Crea un asset para una noticia en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'La imagen fue creada exitosamente',
    type: Asset,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('noticias/:noticia')
  createNoticiaAsset(
    @Param('noticia', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator(), new FileRatioValidator()],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.assetsService.createNoticiaAsset(id, file);
  }

  /**
   * EndPoint para crear el asset para una versión de videojuego
   * @param versionId id de la versión
   * @param file archivo que se va a subir
   * @returns el asset de la versión creado
   */
  @ApiOperation({
    summary: 'Crear un asset para una versión de videojuego',
    description:
      'Crea un asset para una versión de videojuego en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'El asset fue creado exitosamente',
    type: Asset,
  })
  @ApiResponse({
    status: 404,
    description: 'La versión no fue encontrada',
    type: VersionNotFoundResponseDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('versions/:versionId')
  createVersionAsset(
    @Param('versionId', ParseIntPipe) versionId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator(), new FileRatioValidator()],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.assetsService.createVersionAsset(versionId, file);
  }

  /**
   * EndPoint para eliminar un asset
   * @param id id del asset
   * @returns el asset eliminado
   */
  @ApiOperation({
    summary: 'Eliminar un asset',
    description: 'Elimina un asset',
  })
  @ApiResponse({
    status: 200,
    description: 'La imagen fue eliminada exitosamente',
    type: DeleteResultResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'La imagen no fue encontrada',
    type: ImageNotFoundResponseDto,
  })
  @Delete(':id')
  deleteAsset(@Param('id', ParseIntPipe) id: number) {
    return this.assetsService.deleteAsset(id);
  }
}
