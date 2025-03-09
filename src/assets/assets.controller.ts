import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { RegisterAssetDto } from './dto/register-asset.dto';
import { AssetsService } from './assets.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) { }

  /**
   * Endpoint para crear un asset para un videojuego
   * @param id id del videojuego asociado con el asset  
   * @param assetFields campos del asset que se va a crear 
   * @returns el asset del videojuego creado
   */
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
  @Post('noticias/:noticia')
  createNoticiaAsset(
    @Param('noticia') id: number,
    @Body() assetFields: RegisterAssetDto,
  ) {
    console.log('Create noticia asset')
    return this.assetsService.createNoticiaAsset(id, assetFields);
  }

  /**
   * EndPoint para eliminar una Asset 
   * @param id id de la imagen a eliminar 
   * @returns imagen eliminada
   */
  @Delete(':id')
  deleteAsset(@Param('id') id: number) {
    return this.assetsService.deleteAsset(id);
  }
}
