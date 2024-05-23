import { Body, Controller, Param, Post } from '@nestjs/common';

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

  @Post('noticia/:noticia')
  createNoticiaAsset(
    @Param('noticia') id: number,
    @Body() assetFields: RegisterAssetDto,
  ) {
    console.log('Create noticia asset')
    return this.assetsService.createNoticiaAsset(id, assetFields);
  }
}
