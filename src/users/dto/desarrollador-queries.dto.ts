import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Order } from 'src/config/enums/order.enum';

export class DesarrolladorQueries {
  @IsOptional()
  @IsEnum(Order)
  order?: Order;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  offset?: number;
}
