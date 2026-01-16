import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReportService } from './product-report.service';
import { ProductReportController } from './product-report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])], // ⚠️ si necesitas repositorios, aquí los pones
  controllers: [ProductReportController],
  providers: [ProductReportService],
  exports: [ProductReportService],
})
export class ProductReportModule {}
