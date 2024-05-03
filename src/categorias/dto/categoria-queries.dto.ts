import { IsNumber, IsOptional, IsString } from 'class-validator';
import { FindOperator } from 'typeorm';

export class CategoriaQueries {
  @IsString()
  @IsOptional()
  title?: string | FindOperator<string>;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
