import { ApiProperty } from '@nestjs/swagger';

export class ImageNotFoundResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    example: 'La imagen no fue encontrada',
  })
  message: string;

  @ApiProperty({
    example: 'La imagen no existe en la base de datos',
  })
  errorDetails?: string;
}

export class VersionNotFoundResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    example: 'La versión no fue encontrada',
  })
  message: string;

  @ApiProperty({
    example: 'La versión no existe en la base de datos',
  })
  errorDetails?: string;
}
