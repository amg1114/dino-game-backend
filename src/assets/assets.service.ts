import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset, VideoGameAsset } from './asset.entity';
import { Repository } from 'typeorm';
import { VideoGamesService } from '../video-games/services/video-games.service';
import { NoticiasService } from '../noticias/services/noticias.service';
import { FirebaseService } from './services/firebase.service';
import { VersionService } from 'src/video-games/services/version.service';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetsRepository: Repository<Asset>,
    @InjectRepository(VideoGameAsset)
    private readonly videoGameAssetsRepository: Repository<VideoGameAsset>,
    private readonly versionsService: VersionService,
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
    index: number,
  ) {
    const availableFields = ['thumb', 'hero', 'asset'];
    if (availableFields.indexOf(field) === -1) {
      throw new HttpException(
        `Field must be one of ${availableFields.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const videoGame = await this.videoGamesService.softFindById(+owner);

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

      if (index) {
        videoGameAsset.index = index;
      }

      return await this.videoGameAssetsRepository.save(videoGameAsset);
    }

    return asset;
  }

  async updateVideoGameAsset(
    assetID: number,
    gameID: number,
    file: Express.Multer.File,
  ) {
    const asset = await this.assetsRepository.findOne({
      where: { id: assetID },
      relations: ['videoGameThumb'],
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }
    const videoGame = await this.videoGamesService.softFindById(gameID);
    await this.firebaseService.deleteFile(asset.url);

    const url = await this.firebaseService.uploadGameImage(file, videoGame);
    asset.url = url;
    asset.title = file.originalname;

    return this.assetsRepository.save(asset);
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

  async updateNoticiaAsset(
    assetID: number,
    noticiaID: number,
    file: Express.Multer.File,
  ) {
    const asset = await this.assetsRepository.findOne({
      where: { id: assetID },
      relations: ['noticiaThumb'],
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }
    const noticia = await this.noticiasService.findOne(noticiaID);
    await this.firebaseService.deleteFile(asset.url);

    const url = await this.firebaseService.uploadNoticiaImage(file, noticia);
    asset.url = url;
    asset.title = file.originalname;

    return this.assetsRepository.save(asset);
  }

  async createVersionAsset(owner: number, file: Express.Multer.File) {
    const version = await this.versionsService.findById(owner);

    if (!version) {
      throw new HttpException('Version not found', HttpStatus.NOT_FOUND);
    }

    const url = await this.firebaseService.uploadVersionFile(file, version);
    const asset = this.assetsRepository.create({
      url,
      videoGameFile: version,
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
    const result = await this.assetsRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException('Asset was not found', HttpStatus.NOT_FOUND);
    }
    await this.firebaseService.deleteFile(asset.url);
    return result;
  }
}
