import { Body, Controller, Post } from '@nestjs/common';

import { RegisterAssetDto } from './dto/register-asset.dto';
import { AssetsService } from './assets.service';
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  uploadFile(@Body() assetFields: RegisterAssetDto) {
    return this.assetsService.register(assetFields);
  }
}
