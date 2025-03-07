import { IsNumber, IsOptional, IsString } from 'class-validator';

export class VideoGameQueries {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  categoria?: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @IsOptional()
  precio?: number;

  categorias?: object;
}
