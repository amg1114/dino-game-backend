import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Order } from 'src/config/enums/order.enum';
import { GameOrderBy } from 'src/config/enums/orderby.enum';

export class VideoGameQueries {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  offset?: number;

  @IsString()
  @IsOptional()
  categoria?: string;

  @IsOptional()
  @Transform(({ key, obj }) => obj[key] === 'true' || obj[key] === '1')
  @IsBoolean()
  descuentos?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ key, obj }) => obj[key] === 'true' || obj[key] === '1')
  onlyPaidGames?: boolean;

  @IsNumber()
  @IsOptional()
  developer?: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  precio?: number;

  @IsEnum(GameOrderBy)
  @IsOptional()
  orderBy?: GameOrderBy;

  @IsEnum(Order)
  @IsOptional()
  order?: Order;
}

export class UserVideoGameQueries {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  offset?: number;

  @IsString()
  @IsOptional()
  search?: string;
}
