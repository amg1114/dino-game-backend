import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateVideoGameDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsDate()
  @IsNotEmpty()
  fechaLanzamiento: Date;

  @IsArray()
  @IsOptional()
  categorias?: number[];
}

export class VideoGameAssetsDto {
  thumb: Express.Multer.File;
  hero: Express.Multer.File;
  assets: Express.Multer.File[];
}

export const videoGameAssetsFieldInterceptor: MulterField[] = [
  { name: 'thumb', maxCount: 1 },
  { name: 'hero', maxCount: 1 },
  { name: 'assets', maxCount: 5 },
];
