import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { FindOperator } from 'typeorm';

export class CategoriaQueries {
  @IsString()
  @IsOptional()
  title?: string | FindOperator<string>;

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 })
  @IsOptional()
  @Min(0)
  limit?: number;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 })
  @IsOptional()
  @Min(0)
  offset?: number;

  @IsOptional()
  @Transform(({ key, obj }) => obj[key] === 'true' || obj[key] === '1')
  @IsBoolean()
  withGames?: boolean;

  @IsOptional()
  @IsString()
  search?: string;
}
