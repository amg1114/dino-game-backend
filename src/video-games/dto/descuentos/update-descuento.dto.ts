import { IsDate, IsDecimal, IsOptional } from "class-validator";

export class UpdateDescuentoDto {
    /**
     * Porcentaje de descuento
     */
    @IsDecimal()
    @IsOptional()
    porcentaje?: number;

    /**
     * Fecha de inicio del descuento
     */
    @IsDate()
    @IsOptional()
    fechaInicio?: Date;
    
    /**
     * Fecha de fin del descuento
    */
    @IsDate()
    @IsOptional()
    fechaFin?: Date;
}