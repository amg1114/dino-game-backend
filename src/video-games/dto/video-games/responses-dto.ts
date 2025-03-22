import { ApiProperty } from '@nestjs/swagger';

export class VideoGamesNotFoundResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Videogames was not found',
  })
  message: string;
}

export class VideoGameNotFoundResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Videogame was not found',
  })
  message: string;
}

export class UpdateVideoGameResponseDto {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Videogame could not updated',
  })
  message: string;
}

export class DeleteVideoGameResponseDto {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Videogame could not deleted',
  })
  message: string;
}
