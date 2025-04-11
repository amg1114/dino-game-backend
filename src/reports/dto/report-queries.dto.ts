import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Order } from 'src/config/enums/order.enum';

export class ReportQueries {
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

  @IsEnum(Order)
  @IsOptional()
  order?: Order;
}
