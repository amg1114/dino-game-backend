import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { Repository } from 'typeorm';
import { RegisterAssetDto } from './dto/register-asset.dto';
import { VideoGamesService } from '../video-games/services/video-games.service';
import { NoticiasService } from '../noticias/noticias.service';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetsRepository: Repository<Asset>,
    private readonly videoGamesService: VideoGamesService,
    private readonly noticiasService: NoticiasService
  ) {}

  async create(assetFields: RegisterAssetDto) {
      const { videoGameId, noticiaId, ...fields } = assetFields;
      const asset = this.assetsRepository.create(fields);

      if (videoGameId) {
        const videoGame = await this.videoGamesService.findById(videoGameId);
        asset.videoGame = videoGame;
      }else if (noticiaId) {
        const noticia = await this.noticiasService.findOne(noticiaId);
        asset.noticia = noticia;
      }
      
      return this.assetsRepository.save(asset);
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
