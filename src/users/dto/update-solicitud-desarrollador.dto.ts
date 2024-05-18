import { IsEnum, IsNotEmpty } from "class-validator";
import { EstadoSolicitud } from "../entities/solicitud-desarrollador.entity";

export class UpdateSolicitudDesarrolladorDto {
    @IsNotEmpty()
    @IsEnum(EstadoSolicitud)
    estado: EstadoSolicitud;
}