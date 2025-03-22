import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { RegisterAssetDto } from './dto/register-asset.dto';
import { AssetsService } from './assets.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetNoticia, AssetVideoGame } from './asset.entity';
import { ImageNotFoundResponseDto } from './dto/responses-dto';
import { DeleteResultResponseDto } from 'src/config/responses-dto';

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  /**
   * Endpoint para crear un asset para un videojuego
   * @param id id del videojuego asociado con el asset
   * @param assetFields campos del asset que se va a crear
   * @returns el asset del videojuego creado
   */
  @ApiOperation({
    summary: 'Crear un asset para un videojuego',
    description: 'Crea un asset para un videojuego en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'La imagen fue creada exitosamente',
    type: AssetVideoGame,
  })
  @Post('video-games/:videogame')
  createVideoGameAsset(
    @Param('videogame') id: number,
    @Body() assetFields: RegisterAssetDto,
  ) {
    return this.assetsService.createVideoGameAsset(id, assetFields);
  }

  /**
   * EndPoint para crear el asset para una noticia
   * @param id id de la noticia
   * @param assetFields campos del asset que se va a crear
   * @returns el asset de la noticia creado
   */
  @ApiOperation({
    summary: 'Crear un asset para una noticia',
    description: 'Crea un asset para una noticia en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'La imagen fue creada exitosamente',
    type: AssetNoticia,
  })
  @Post('noticias/:noticia')
  createNoticiaAsset(
    @Param('noticia') id: number,
    @Body() assetFields: RegisterAssetDto,
  ) {
    console.log('Create noticia asset');
    return this.assetsService.createNoticiaAsset(id, assetFields);
  }

  /**
   * EndPoint para eliminar una Asset
   * @param id id de la imagen a eliminar
   * @returns imagen eliminada
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
  deleteAsset(@Param('id') id: number) {
    return this.assetsService.deleteAsset(id);
  }
}
