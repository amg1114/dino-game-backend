import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { RegisterAssetDto } from './dto/register-asset.dto';
import { AssetsService } from './assets.service';
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  createAsset(@Body() assetFields: RegisterAssetDto) {
    return this.assetsService.create(assetFields);
  }
  
  @Get('video-game/:id')
  getVideoGameAssets(@Param('id') id: number) {
    return this.assetsService.getVideoGameAssets(id);
  }
  
  @Delete(':id')
  deleteAsset(@Param('id') id: number) {
    return this.assetsService.getVideoGameAssets(id);
  }
}
