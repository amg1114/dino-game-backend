import { OrderBy } from 'src/config/enums/orderby.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Order } from 'src/config/enums/order.enum';

export class SolicitudDesarrolladorQueries {
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 })
  @IsOptional()
  limit?: number;

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 })
  @IsOptional()
  offset?: number;

  @IsOptional()
  @IsEnum(Order)
  order?: Order;

  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @IsString()
  @IsOptional()
  search?: string;
}
