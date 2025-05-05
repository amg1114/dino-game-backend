import { IsString, IsNotEmpty, IsDate, IsArray } from 'class-validator';

export class CreateVersionDto {
  @IsString()
  @IsNotEmpty()
  version: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsDate()
  @IsNotEmpty()
  releaseDate: Date;

  @IsArray()
  @IsNotEmpty()
  requisitos: string[];
}
