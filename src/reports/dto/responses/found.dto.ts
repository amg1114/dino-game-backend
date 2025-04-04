import { ApiProperty } from '@nestjs/swagger';
import { Report } from 'src/reports/entities/report.entity';

export class ReportsFoundDto {
  @ApiProperty({
    example: [
      {
        id: 1,
        state: 'PENDING',
        user: { id: 1, name: 'John Doe' },
        videoGame: { id: 1, title: 'Game Title' },
        typeReport: { id: 1, name: 'Bug' },
      },
    ],
  })
  data: Report[];

  @ApiProperty({
    example: 2,
  })
  offset: number;

  @ApiProperty({
    example: 10,
  })
  total: number;
}
