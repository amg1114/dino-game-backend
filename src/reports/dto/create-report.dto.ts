import { IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  typeReportId: number;
}
