import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { RegisterAssetDto } from './dto/register-asset.dto';
import { AssetsService } from './assets.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post('video-games/:videogame')
  createVideoGameAsset(
    @Param('videogame') id: number,
    @Body() assetFields: RegisterAssetDto,
  ) {
    return this.assetsService.createVideoGameAsset(id, assetFields);
  }

  @Post('noticias/:noticia')
  createNoticiaAsset(
    @Param('noticia') id: number,
    @Body() assetFields: RegisterAssetDto,
  ) {
    console.log('Create noticia asset')
    return this.assetsService.createNoticiaAsset(id, assetFields);
  }

  @Delete(':id')
  deleteAsset(@Param('id') id: number) {
    return this.assetsService.deleteAsset(id);
  }
}
