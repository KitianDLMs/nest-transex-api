import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ProductReportService } from './product-report.service';
import { ProductReportDto } from './dto/product-report-dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('product-report')
export class ProductReportController {
  constructor(private readonly productReportService: ProductReportService) {}

  @Get()
  async getReport(@Query() filters: ProductReportDto, @Req() req) {                
    return this.productReportService.getReport(filters, req.user);
  }
}
