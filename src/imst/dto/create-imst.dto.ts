import { Type } from 'class-transformer';
import { IsOptional, IsString, IsBoolean, IsNumber, IsDate } from 'class-validator';

export class CreateImstDto {

  @IsString()
  cust_code?: string;

  @IsString()
  proj_code?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  update_date?: Date;

  @IsString()
  item_code: string;

  @IsOptional()
  @IsString()
  descr?: string;

  @IsOptional()
  @IsString()
  short_descr?: string;

  @IsOptional()
  @IsBoolean()
  invy_flag?: boolean;

  @IsOptional()
  @IsNumber()
  taxble_code?: number;

  @IsOptional()
  @IsNumber()
  tax_rate_code?: number;

  @IsOptional()
  @IsString()
  usage_code?: string;

  @IsOptional()
  @IsString()
  non_tax_rsn_code?: string;

  @IsOptional()
  @IsString()
  item_cat?: string;

  @IsOptional()
  @IsString()
  matl_type?: string;

  @IsOptional()
  @IsString()
  invy_item_code?: string;

  @IsOptional()
  @IsBoolean()
  print_on_tkt_flag?: boolean;

  @IsOptional()
  @IsBoolean()
  print_qty_on_tkt_flag?: boolean;

  @IsOptional()
  @IsString()
  order_uom?: string;

  @IsOptional()
  @IsString()
  price_uom?: string;

  @IsOptional()
  @IsString()
  invy_uom?: string;

  @IsOptional()
  @IsString()
  purch_uom?: string;

  @IsOptional()
  @IsString()
  batch_uom?: string;

  @IsOptional()
  @IsString()
  rpt_uom?: string;

  @IsOptional()
  @IsBoolean()
  price_admix_flag?: boolean;

  @IsOptional()
  @IsString()
  agg_size?: string;

  @IsOptional()
  @IsString()
  cem_type?: string;

  @IsOptional()
  @IsNumber()
  days_to_strgth?: number;

  @IsOptional()
  @IsNumber()
  max_water?: number;

  @IsOptional()
  @IsNumber()
  water_cem_ratio?: number;

  @IsOptional()
  @IsNumber()
  pct_air?: number;

  @IsOptional()
  @IsString()
  slump?: string;

  @IsOptional()
  @IsString()
  slump_uom?: string;

  @IsOptional()
  @IsNumber()
  strgth?: number;

  @IsOptional()
  @IsString()
  strgth_uom?: string;

  @IsOptional()
  @IsNumber()
  water_hold?: number;

  @IsOptional()
  @IsBoolean()
  terms_disc_flag?: boolean;

  @IsOptional()
  @IsBoolean()
  trade_disc_flag?: boolean;

  @IsOptional()
  @IsDate()
  expir_date?: Date;

  @IsOptional()
  @IsBoolean()
  serial_num_flag?: boolean;

  @IsOptional()
  @IsBoolean()
  lot_num_flag?: boolean;

  @IsOptional()
  @IsBoolean()
  resale_flag?: boolean;

  @IsOptional()
  @IsBoolean()
  const_flag?: boolean;
}
