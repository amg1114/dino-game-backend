import { IsString } from 'class-validator';

export class CreateTypeReportDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
