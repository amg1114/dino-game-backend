import { ConfigModule, ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export const NOTICIAS_FILE_PATH = 'noticias';
export const VIDEO_GAMES_FILE_PATH = 'video-games';

export type FirebaseFilePath = 'noticias' | 'video-games';

ConfigModule.forRoot();
const configService = new ConfigService();

const firebaseConfig = {
  apiKey: configService.getOrThrow('FIREBASE_API_KEY'),
  authDomain: configService.getOrThrow('FIREBASE_AUTH_DOMAIN'),
  projectId: configService.getOrThrow('FIREBASE_PROJECT_ID'),
  storageBucket: configService.getOrThrow('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: configService.getOrThrow('FIREBASE_MESSAGING_SENDER_ID'),
  appId: configService.getOrThrow('FIREBASE_APP_ID'),
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
