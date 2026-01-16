import { IsOptional, IsString, IsDateString } from 'class-validator';

export class ProductReportDto {
  @IsString()
  custCode: string; // obligatorio

  @IsOptional()
  @IsString()
  projCode?: string;

  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
