import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { State } from 'src/config/enums/state';

export class CreateReportDto {
  @IsEnum(State)
  @IsOptional()
  state: State;

  @IsNumber()
  typeReportId: number;
}
