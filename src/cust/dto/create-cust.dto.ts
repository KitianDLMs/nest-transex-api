import { IsOptional, IsString, IsDateString } from "class-validator";

export class CreateCustDto {
  @IsString()
  cust_code: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  sort_name?: string;

  @IsOptional()
  @IsString()
  addr_line_1?: string;

  @IsOptional()
  @IsString()
  addr_line_2?: string;

  @IsOptional()
  @IsString()
  addr_city?: string;

  @IsOptional()
  @IsString()
  addr_state?: string;

  @IsOptional()
  @IsString()
  addr_cntry?: string;

  @IsOptional()
  @IsString()
  addr_postcd?: string;

  @IsOptional()
  @IsString()
  contct_name?: string;

  @IsOptional()
  @IsString()
  phone_num_1?: string;

  @IsOptional()
  @IsString()
  phone_num_2?: string;

  @IsOptional()
  @IsString()
  phone_num_3?: string;

  @IsOptional()
  @IsString()
  phone_num_4?: string;

  @IsOptional()
  @IsDateString()
  setup_date?: Date;
}
