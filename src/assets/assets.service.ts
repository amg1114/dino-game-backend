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
    private readonly noticiasService: NoticiasService,
  ) {}

  /**
   * Crear un asset para un videojuego
   * @param owner ID del videojuego al que pertenece el asset
   * @param assetFields Datos del asset
   * @returns El asset creado
   */
  async createVideoGameAsset(owner: number, assetFields: RegisterAssetDto) {
    const videoGame = await this.videoGamesService.softFindById(owner);
    const asset = this.assetsRepository.create({
      ...assetFields,
      videoGameThumb: videoGame,
      videoGameHero: videoGame,
    });
    return this.assetsRepository.save(asset);
  }

  /**
   * Crear un asset para una noticia
   * @param owner ID de la noticia a la que pertenece el asset
   * @param assetFields Datos del asset
   * @returns El asset creado
   */
  async createNoticiaAsset(owner: number, assetFields: RegisterAssetDto) {
    const noticia = await this.noticiasService.findOne(owner);
    const asset = this.assetsRepository.create({
      ...assetFields,
      noticiaThumb: noticia,
    });
    return this.assetsRepository.save(asset);
  }

  /**
   * Elimina un asset
   * @param id ID del asset a eliminar
   * @returns El asset eliminado
   */
  async deleteAsset(id: number) {
    const result = await this.assetsRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('Asset was not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
