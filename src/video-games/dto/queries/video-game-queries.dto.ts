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

  @IsNumber()
  @IsOptional()
  categoria?: number;

  @IsOptional()
  @IsBoolean()
  descuentos?: boolean;

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
