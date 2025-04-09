import { PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';
import { State } from 'src/config/enums/state';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @IsOptional()
  @IsEnum(State)
  state?: State;
}
