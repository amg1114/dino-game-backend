import { ApiProperty } from '@nestjs/swagger';
import { Role } from './enums/roles.enum';

/**
 * DTO para documentar la respuesta de la actualización de datos en la base de datos.
 */
export class UpdateResultResponseDto {
  @ApiProperty({
    description: 'Número de filas afectadas por la actualización',
    example: 1,
  })
  affected?: number;

  @ApiProperty({
    description: 'Resultado crudo de la consulta SQL ejecutada',
    example: [],
  })
  raw: any;

  @ApiProperty({
    description:
      'Valores generados por la base de datos durante la actualización',
    example: [],
  })
  generatedMaps: object[];
}

/**
 * DTO para documentar la respuesta de la eliminación de datos en la base de datos.
 */
export class DeleteResultResponseDto {
  @ApiProperty({
    description: 'Número de filas afectadas por la eliminación',
    example: 1,
  })
  affected?: number | null;

  @ApiProperty({
    description: 'Resultado crudo de la consulta SQL ejecutada',
    example: [],
  })
  raw: any;
}

/**
 * DTO para documentar la respuesta del método getRole.
 */
export class GetRoleResponseDto {
  @ApiProperty({
    enum: Role,
    isArray: true,
    example: [Role.ADMINISTRATOR, Role.DEVELOPER],
  })
  roles: Role[];
}
