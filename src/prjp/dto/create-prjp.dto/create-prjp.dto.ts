import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreatePrjpDto {
  cust_code: string;
  proj_code: string;
  intrnl_line_num: number;
  @IsOptional()
  @IsDate()
  update_date?: Date;

  @IsOptional()
  @IsDate()
  price_expir_date?: Date;

  @IsOptional()
  @IsDate()
  effect_date?: Date;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional() @IsDate() content_up_price_effect_date?: Date;
  @IsOptional() @IsDate() content_down_price_effect_date?: Date;

  @IsOptional() @IsNumber() content_up_price?: number;
  @IsOptional() @IsNumber() content_down_price?: number;

  @IsOptional()
  @IsDate()
  modified_date?: Date; 
}
