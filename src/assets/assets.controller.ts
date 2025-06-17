import {
  Body,
  Controller,
  Delete,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AssetsService } from './assets.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTypeValidator } from './validators/filte-type.validator';
import { FileRatioValidator } from './validators/file-ratio.validator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Assets')
@Controller('assets')
@UseGuards(AuthGuard, RolesGuard)
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

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
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('video-games/:videogame/:field')
  createVideoGameAsset(
    @Param('videogame', ParseIntPipe) id: number,
    @Param('field') field: string,
    @Body('index') index: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator(), new FileRatioValidator()],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.assetsService.createVideoGameAsset(id, file, field, index);
  }

  @ApiOperation({
    summary: 'Actualizar un asset de un videojuego',
    description:
      'Actualiza un asset existente de un videojuego en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'El asset fue actualizado exitosamente',
  })
  @ApiTags('Assets')
  @Put('video-games/:videogame/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateVideoGameAsset(
    @Param('id', ParseIntPipe) id: number,
    @Param('videogame', ParseIntPipe) videogame: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator(), new FileRatioValidator()],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.assetsService.updateVideoGameAsset(id, videogame, file);
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
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('noticias/:noticia')
  createNoticiaAsset(
    @Param('noticia') id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator(), new FileRatioValidator()],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.assetsService.createNoticiaAsset(id, file);
  }

  @Put('noticias/:noticia/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateNoticiaAsset(
    @Param('id', ParseIntPipe) id: number,
    @Param('noticia', ParseIntPipe) noticia: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator(), new FileRatioValidator()],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.assetsService.updateNoticiaAsset(id, noticia, file);
  }

  @Post('versions/:version')
  @UseInterceptors(FileInterceptor('file'))
  createVersionFile(
    @Param('version', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            allowedTypes: [
              'application/zip',
              'application/x-zip-compressed',
              'application/x-zip',
            ],
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.assetsService.createVersionAsset(id, file);
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
  })
  @ApiResponse({
    status: 404,
    description: 'La imagen no fue encontrada',
  })
  @Delete(':id')
  deleteAsset(@Param('id') id: number) {
    return this.assetsService.deleteAsset(id);
  }
}
