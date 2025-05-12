import { IsEnum, IsNotEmpty } from 'class-validator';
import { State } from 'src/config/enums/state';

export class UpdateSolicitudDesarrolladorDto {
  @IsNotEmpty()
  @IsEnum(State)
  estado: State;
}
