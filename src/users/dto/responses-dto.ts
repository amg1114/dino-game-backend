import { ApiProperty } from '@nestjs/swagger';

export class SolicitudNotFoundResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Solicitud no encontrada',
  })
  message: string;
}

export class DesarrolladoresNotFoundResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;
  @ApiProperty({
    example: 'No se encontraron desarrolladores',
  })
  message: string;
}

export class DesarrolladorConflictResponseDto {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Desarrollador no eliminado',
  })
  message: string;
}

export class DesarrolladorNotFoundResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Desarrollador no encontrado',
  })
  message: string;
}

export class SolicitudBadRequestResponseDto {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Ya existe una solicitud',
  })
  message: string;
}

//Para Usuarios

export class UserNotFoundResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;
  @ApiProperty({
    example: 'El usuario no fue encontrado',
  })
  message: string;
}

export class UserConflictResponseDto {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;
  @ApiProperty({
    example: 'El usuario ya existe',
  })
  message: string;
}

export class UpdateUserConflictResponseDto {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;
  @ApiProperty({
    example: 'User could not update',
  })
  message: string;
}

export class DeleteUserConflictResponseDto {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;
  @ApiProperty({
    example: 'User could not delete',
  })
  message: string;
}
