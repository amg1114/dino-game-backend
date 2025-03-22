import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponseDto {
  @ApiProperty({
    example: 401,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Invalid credentials',
  })
  message: string;
}

export class InternalServerErrorResponseDto {
  @ApiProperty({
    example: 500,
  })
  statusCode: number;
  @ApiProperty({
    example: 'User not created',
  })
  message: string;
}
