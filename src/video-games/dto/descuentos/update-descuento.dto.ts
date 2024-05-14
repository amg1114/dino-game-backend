import { IsDate, IsDecimal, IsNumber, IsOptional } from "class-validator";

export class UpdateDescuentoDto {
    /**
     * Porcentaje de descuento
     */
    @IsNumber()
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