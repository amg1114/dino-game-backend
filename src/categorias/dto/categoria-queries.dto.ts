import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { FindOperator } from 'typeorm';

export class CategoriaQueries {
  @IsString()
  @IsOptional()
  title?: string | FindOperator<string>;

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 })
  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 })
  @IsOptional()
  offset?: number;

  @IsOptional()
  @IsBoolean()
  withGames?: boolean;
}
