import { SolicitudOrderBy } from 'src/config/enums/orderby.enum';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Order } from 'src/config/enums/order.enum';

export class SolicitudDesarrolladorQueries {
  @IsNumber()
  @IsOptional()
  @Min(1)
  limit?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsOptional()
  @IsEnum(Order)
  order?: Order;

  @IsOptional()
  @IsEnum(SolicitudOrderBy)
  orderBy?: SolicitudOrderBy;

  @IsString()
  @IsOptional()
  search?: string;
}
