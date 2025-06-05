import { Controller, Get, Param, Req, Sse, UseGuards } from '@nestjs/common';
import { from, interval, map, mergeMap, startWith } from 'rxjs';
import { StatisticsService } from './statistics.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/config/enums/roles.enum';

@Controller('statistics')
@ApiTags('Statistics')
@UseGuards(AuthGuard, RolesGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  @ApiOperation({
    summary: 'Get statistics for a specific month and year',
    description:
      'This endpoint provides real-time statistics for a specific month and year.',
  })
  @ApiResponse({
    status: 200,
    description: 'Real-time statistics data',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Sse()
  async getAdminStatistics(@Req() req: any) {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear());

    return interval(1000).pipe(
      startWith(0), // 🔥 Emite inmediatamente un primer valor
      mergeMap(() =>
        from(
          this.statisticsService.getStatistics(
            month,
            year,
            req.user.tipo === Role.DEVELOPER ? req.user.id : undefined,
          ),
        ).pipe(map((statistics) => ({ data: statistics }))),
      ),
    );
  }

  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  @ApiOperation({
    summary: 'Get statistics for a specific month and year',
    description:
      'This endpoint provides statistics for a specific month and year.',
  })
  @ApiResponse({
    status: 200,
    description: 'Statistics data',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get(':month/:year')
  async getStatistics(
    @Param('month') month: string,
    @Param('year') year: string,
    @Req() req: any,
  ) {
    return this.statisticsService.getStatistics(
      month,
      year,
      req.user.tipo === Role.DEVELOPER ? req.user.id : undefined,
    );
  }
}
