import { IsOptional, IsIn, IsInt, Min, IsNumber } from 'class-validator';

export class QueriesNoticesDto {
  @IsOptional()
  @IsIn(['ASC', 'DESC'], { message: 'Order must be either ASC or DESC' })
  order?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsIn(['titulo', 'fecha'], {
    message: 'OrderBy must be either titulo or fecha',
  })
  orderBy?: 'titulo' | 'fecha' = 'titulo';

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
