import { Injectable } from '@nestjs/common';
import {
  FirebaseFilePath,
  NOTICIAS_FILE_PATH,
  storage,
  VIDEO_GAMES_FILE_PATH,
} from 'src/config/firebase.config';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { VideoGame } from 'src/video-games/entities/video-game.entity';
import { Noticia } from 'src/noticias/entities/noticia.entity';
import { Response } from 'express';
import { Version } from 'src/video-games/entities/version.entity';

@Injectable()
export class FirebaseService {
  private async uploadFile(
    file: Express.Multer.File,
    folder: FirebaseFilePath,
    ownerId: number | string,
  ) {
    const fileRef = ref(
      storage,
      `uploads/${folder}/${ownerId}/${file.originalname}`,
    );
    try {
      await uploadBytes(fileRef, new Uint8Array(file.buffer));
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.error('Error uploading file to Firebase:', error);
      throw new Error('Error uploading file');
    }
  }

  async uploadGameImage(
    file: Express.Multer.File,
    game: VideoGame,
  ): Promise<string> {
    return this.uploadFile(file, VIDEO_GAMES_FILE_PATH, game.id);
  }

  async uploadNoticiaImage(
    file: Express.Multer.File,
    noticia: Noticia,
  ): Promise<string> {
    return this.uploadFile(file, NOTICIAS_FILE_PATH, noticia.id);
  }

  async uploadVersionFile(file: Express.Multer.File, version: Version) {
    const path = `${version.videoGame.id}/versiones/${version.id}`;

    return this.uploadFile(file, VIDEO_GAMES_FILE_PATH, path);
  }

  async deleteFile(path: string) {
    const fileRef = ref(storage, path);
    try {
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error deleting file from Firebase:', error);
      throw new Error('Error deleting file');
    }
  }

  async getFile(path: string, res: Response) {
    const fileRef = ref(storage, `uploads/${path}`);
    try {
      const file = await getDownloadURL(fileRef);

      const response = await fetch(file);
      res.setHeader('Content-Type', response.headers.get('Content-Type'));
      res.setHeader('Content-Disposition', 'inline');
      res.setHeader('Content-Length', response.headers.get('Content-Length'));

      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } catch (error) {
      console.error('Error uploading file to Firebase:', error);
      throw new Error('Error uploading file');
    }
  }
}
