import { Controller, Param, Req, Sse, UseGuards } from '@nestjs/common';
import { interval, switchMap } from 'rxjs';
import { StatisticsService } from './statistics.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/config/enums/roles.enum';
import { SalesReportResponseDto } from './dto/get-sales.dto';

@Controller('statistics')
@ApiTags('Statistics')
@UseGuards(AuthGuard, RolesGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Sse(':month/:year')
  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  @ApiOperation({
    summary: 'Get statistics for a specific month and year',
    description:
      'This endpoint provides real-time statistics for a specific month and year.',
  })
  @ApiResponse({
    status: 200,
    description: 'Real-time statistics data',
    type: SalesReportResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getAdminStatistics(
    @Param('month')
    month: string,
    @Param('year') year: string,
    @Req() req: any,
  ) {
    return interval(1000 * 5).pipe(
      switchMap(async () => {
        const statistics = await this.statisticsService.getStatistics(
          month,
          year,
          req.user.tipo === Role.DEVELOPER ? req.user.id : undefined,
        );
        return { data: statistics };
      }),
    );
  }
}
