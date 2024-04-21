import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { Repository } from 'typeorm';
import { RegisterAssetDto } from './dto/register-asset.dto';
import { VideoGamesService } from 'src/video-games/video-games.service';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetsRepository: Repository<Asset>,
    private readonly videoGamesService: VideoGamesService,
  ) {}

  async create(assetFields: RegisterAssetDto) {
    if (assetFields.videoGameId) {
      const { videoGameId, ...fields } = assetFields;
      const videoGame = await this.videoGamesService.findById(videoGameId);
      const asset = this.assetsRepository.create(fields);

      asset.videoGame = videoGame;

      return this.assetsRepository.save(asset);
    }
  }

  async getVideoGameAssets(video_game: number) {
    const videoGame = await this.videoGamesService.findById(video_game);
    return this.assetsRepository.find({
      where: {
        videoGame,
      },
    });
  }

  async deleteAsset(id: number) {
    const result = await this.assetsRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('The asset was not deleted', HttpStatus.CONFLICT);
    }
    
    return result;
  }
}
