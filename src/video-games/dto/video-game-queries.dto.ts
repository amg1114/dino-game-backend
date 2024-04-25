import { IsNumber, IsOptional, IsString } from 'class-validator';
import { FindOperator } from 'typeorm';

export class VideoGameQueries {
  @IsNumber()
  @IsOptional()
  limit?: number;
  
  @IsNumber()
  @IsOptional()
  categoria?: number;
  
  @IsString()
  @IsOptional()
  search?: string | FindOperator<string>;

  categorias?: object;
}
