import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset, AssetNoticia, AssetVideoGame } from './asset.entity';
import { Repository } from 'typeorm';
import { RegisterAssetDto } from './dto/register-asset.dto';
import { VideoGamesService } from '../video-games/services/video-games.service';
import { NoticiasService } from '../noticias/noticias.service';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetsRepository: Repository<Asset>,
    @InjectRepository(AssetVideoGame)
    private readonly assetsVideoGameRepository: Repository<AssetVideoGame>,
    @InjectRepository(AssetNoticia)
    private readonly assetsNoticiaRepository: Repository<AssetNoticia>,
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
    const videoGame = await this.videoGamesService.findById(owner);
    const asset = await this.assetsRepository.save(assetFields);
    const assetVideoGame = this.assetsVideoGameRepository.create({
      assetID: asset.id,
      asset,
      videoGame,
    });

    return this.assetsVideoGameRepository.save(assetVideoGame);
  }

  /**
   * Crear un asset para una noticia
   * @param owner ID de la noticia a la que pertenece el asset
   * @param assetFields Datos del asset
   * @returns El asset creado
   */
  async createNoticiaAsset(owner: number, assetFields: RegisterAssetDto) {
    const noticia = await this.noticiasService.findOne(owner);
    const asset = await this.assetsRepository.save(assetFields);
    const assetNoticia = this.assetsNoticiaRepository.create({
      assetID: asset.id,
      asset,
      noticia,
    });

    return this.assetsNoticiaRepository.save(assetNoticia);
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
