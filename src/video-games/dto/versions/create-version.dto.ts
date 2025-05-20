import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateVersionDto {
  @IsString()
  @IsNotEmpty()
  version: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsArray()
  @IsNotEmpty()
  requisitos: string[];
}
