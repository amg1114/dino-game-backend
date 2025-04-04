import { ApiProperty } from '@nestjs/swagger';
import { Report } from 'src/reports/entities/report.entity';

export class ReportsFoundDto {
  @ApiProperty({
    example: Report,
  })
  data: Report[];

  @ApiProperty({
    example: '2',
  })
  offset: number;

  @ApiProperty({
    example: '10',
  })
  total: number;
}
