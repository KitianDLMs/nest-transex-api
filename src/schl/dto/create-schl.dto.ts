import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsBoolean,
  Length,
} from 'class-validator';

export class CreateSchlDto {
  @IsDateString()
  order_date: Date;

  @IsString()
  @Length(12, 12)
  order_code: string;

  @IsNumber()
  order_intrnl_line_num: number;

  @IsNumber()
  sched_num: number;

  @IsNumber()
  unique_num: number;

  @IsOptional()
  @IsNumber()
  load_num?: number;

  @IsOptional()
  @IsString()
  @Length(8, 8)
  tkt_code?: string;

  @IsOptional()
  @IsString()
  @Length(10, 10)
  truck_code?: string;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  from_plant_code?: string;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  to_plant_code?: string;

  @IsOptional()
  @IsNumber()
  load_size?: number;

  @IsOptional()
  @IsBoolean()
  fixed_time_flag?: boolean;

  @IsOptional()
  @IsBoolean()
  fixed_qty_flag?: boolean;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  remove_rsn_code?: string;

  @IsOptional()
  @IsDateString()
  on_job_time?: Date;

  @IsOptional()
  @IsDateString()
  orig_on_job_time?: Date;

  @IsOptional()
  @IsNumber()
  to_job_trvl_time?: number;

  @IsOptional()
  @IsString()
  @Length(1, 1)
  fixed_to_job_trvl_time_code?: string;

  @IsOptional()
  @IsNumber()
  to_plant_trvl_time?: number;

  @IsOptional()
  @IsString()
  @Length(1, 1)
  fixed_to_plant_trvl_time_code?: string;

  @IsOptional()
  @IsNumber()
  unld_time?: number;

  @IsOptional()
  @IsString()
  @Length(1, 1)
  fixed_unld_time_code?: string;

  @IsOptional()
  @IsBoolean()
  orig_on_job_time_agree_flag?: boolean;

  @IsOptional()
  @IsBoolean()
  cleanup_flag?: boolean;

  @IsOptional()
  @IsNumber()
  truck_spacing_mins?: number;

  @IsOptional()
  @IsBoolean()
  fixed_spacing_flag?: boolean;

  @IsOptional()
  @IsBoolean()
  fixed_to_plant_flag?: boolean;

  @IsOptional()
  @IsNumber()
  travel_time?: number;

  @IsOptional()
  @IsNumber()
  unload_time?: number;

  @IsOptional()
  @IsDateString()
  travel_time_update?: Date;

  @IsOptional()
  @IsDateString()
  unload_time_update?: Date;

  @IsOptional()
  @IsString()
  @Length(10, 10)
  assign_truck_code?: string;

  @IsOptional()
  @IsString()
  @Length(36, 36)
  guid?: string;

  @IsOptional()
  @IsDateString()
  pump_end_pouring_time?: Date;

  @IsOptional()
  @IsBoolean()
  from_pump_schedule_flag?: boolean;

  @IsOptional()
  @IsDateString()
  on_job_time_design_value?: Date;

  @IsOptional()
  @IsNumber()
  unld_time_design_value?: number;

  @IsOptional()
  @IsNumber()
  truck_spacing_min_design_value?: number;

  @IsOptional()
  @IsNumber()
  pump_truck_setup_time?: number;

  @IsOptional()
  @IsNumber()
  pump_truck_uninstall_time?: number;

  @IsOptional()
  @IsNumber()
  job_washdown_time?: number;

  @IsOptional()
  @IsString()
  @Length(6, 6)
  journey_code?: string;

  @IsOptional()
  @IsNumber()
  journey_seq_code?: number;

  @IsOptional()
  @IsDateString()
  journey_date?: Date;

  @IsOptional()
  @IsDateString()
  update_date?: Date;

  @IsOptional()
  @IsString()
  @Length(1, 1)
  u_version?: string;
}
