import { ApiProperty } from '@nestjs/swagger';

class SaleDto {
  @ApiProperty()
  month: string;

  @ApiProperty()
  profit: number;

  @ApiProperty()
  amount: number;
}

class SalesSummaryDto {
  @ApiProperty({ type: [SaleDto] })
  sales: SaleDto[];

  @ApiProperty()
  count: number;

  @ApiProperty()
  profit: number;
}

class VideoGameSalesDto {
  @ApiProperty()
  titulo: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  sales: number;
}

class BestWorstSellingGamesDto {
  @ApiProperty({ type: VideoGameSalesDto })
  mostSoldVideoGame: VideoGameSalesDto;

  @ApiProperty({ type: VideoGameSalesDto })
  leastSoldVideoGame: VideoGameSalesDto;
}

class YearOrMonthSalesDto {
  @ApiProperty({ type: SalesSummaryDto })
  currentYearSales: SalesSummaryDto;

  @ApiProperty({ type: SalesSummaryDto })
  prevYearSales: SalesSummaryDto;

  @ApiProperty({ type: BestWorstSellingGamesDto })
  bestWorstSellingGames: BestWorstSellingGamesDto;
}

class MonthSalesDto {
  @ApiProperty({ type: SalesSummaryDto })
  currentMonthSales: SalesSummaryDto;

  @ApiProperty({ type: SalesSummaryDto })
  prevMonthSales: SalesSummaryDto;

  @ApiProperty({ type: BestWorstSellingGamesDto })
  bestWorstSellingGames: BestWorstSellingGamesDto;
}

export class SalesReportResponseDto {
  @ApiProperty({ type: YearOrMonthSalesDto })
  yearSales: YearOrMonthSalesDto;

  @ApiProperty({ type: MonthSalesDto })
  monthSales: MonthSalesDto;

  @ApiProperty()
  totalVideoGames: number;
}
