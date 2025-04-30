import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset, VideoGameAsset } from './asset.entity';
import { Repository } from 'typeorm';
import { VideoGamesService } from '../video-games/services/video-games.service';
import { NoticiasService } from '../noticias/services/noticias.service';
import { FirebaseService } from './services/firebase.service';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetsRepository: Repository<Asset>,
    @InjectRepository(VideoGameAsset)
    private readonly videoGameAssetsRepository: Repository<VideoGameAsset>,
    private readonly videoGamesService: VideoGamesService,
    private readonly noticiasService: NoticiasService,
    private readonly firebaseService: FirebaseService,
  ) {}

  /**
   * Crear un asset para un videojuego
   * @param owner ID del videojuego al que pertenece el asset
   * @param assetFields Datos del asset
   * @returns El asset creado
   */
  async createVideoGameAsset(
    owner: number,
    file: Express.Multer.File,
    field: string,
  ) {
    const availableFields = ['thumb', 'hero', 'asset'];
    if (availableFields.indexOf(field) === -1) {
      throw new HttpException(
        `Field must be one of ${availableFields.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const videoGame = await this.videoGamesService.softFindById(owner);

    if (!videoGame) {
      throw new HttpException('Video game not found', HttpStatus.NOT_FOUND);
    }

    const url = await this.firebaseService.uploadGameImage(file, videoGame);

    const asset = this.assetsRepository.create({
      url,
      title: file.originalname,
    });

    if (field === 'thumb') {
      asset.videoGameThumb = videoGame;
    } else if (field === 'hero') {
      asset.videoGameHero = videoGame;
    }

    await this.assetsRepository.save(asset);

    if (field === 'asset') {
      const videoGameAsset = this.videoGameAssetsRepository.create({
        videoGame,
        asset,
      });
      return await this.videoGameAssetsRepository.save(videoGameAsset);
    }

    return asset;
  }

  /**
   * Crear un asset para una noticia
   * @param owner ID de la noticia a la que pertenece el asset
   * @param assetFields Datos del asset
   * @returns El asset creado
   */
  async createNoticiaAsset(owner: number, file: Express.Multer.File) {
    const noticia = await this.noticiasService.findOne(owner);
    const url = await this.firebaseService.uploadNoticiaImage(file, noticia);
    const asset = this.assetsRepository.create({
      url,
      noticiaThumb: noticia,
      title: file.originalname,
    });
    return this.assetsRepository.save(asset);
  }

  /**
   * Elimina un asset
   * @param id ID del asset a eliminar
   * @returns El asset eliminado
   */
  async deleteAsset(id: number) {
    const asset = await this.assetsRepository.findOne({
      where: { id },
    });
    const result = await this.assetsRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('Asset was not found', HttpStatus.NOT_FOUND);
    }
    await this.firebaseService.deleteFile(asset.url);
    return result;
  }
}
