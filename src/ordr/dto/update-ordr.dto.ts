import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateOrdrDto {

  @IsOptional()
  @IsDateString()
  order_date?: string;

  @IsOptional()
  @IsString()
  cust_code?: string;

  @IsOptional()
  @IsString()
  ship_cust_code?: string;

  @IsOptional()
  @IsString()
  ref_cust_code?: string;

  @IsOptional()
  @IsString()
  proj_code?: string;

  @IsOptional()
  @IsString()
  proj_name?: string;

  @IsOptional()
  @IsString()
  cust_job_num?: string;

  @IsOptional()
  @IsString()
  po?: string;

  @IsOptional()
  @IsString()
  cust_sort_name?: string;

  @IsOptional()
  @IsString()
  setup_date?: string;
}
