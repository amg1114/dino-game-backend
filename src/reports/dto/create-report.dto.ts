import { IsEnum, IsNumber } from 'class-validator';
import { State } from 'src/config/enums/state';

export class CreateReportDto {
  @IsEnum(State)
  state: State;

  @IsNumber()
  typeReportId: number;
}
