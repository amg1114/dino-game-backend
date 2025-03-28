import { IsOptional, IsInt, Min, IsNumber } from 'class-validator';
import { Order } from 'src/config/enums/order.enum';
import { OrderBy } from 'src/config/enums/orderby.enum';

export class QueriesNoticesDto {
  @IsOptional()
  order?: Order = Order.ASC;

  @IsOptional()
  orderBy?: OrderBy = OrderBy.TITLE;

  @IsOptional()
  @IsNumber()
  @IsInt({ message: 'Offset must be an integer' })
  @Min(0, { message: 'Offset must be at least 0' })
  offset?: number = 0;

  @IsOptional()
  @IsNumber()
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be at least 1' })
  limit?: number = null;

  @IsOptional()
  @IsNumber()
  @IsInt({ message: 'Author must be an integer' })
  autor?: number;
}
