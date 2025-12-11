import { IsOptional, IsString, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateTickDto {

  @IsDateString()
  order_date: string;

  @IsString()
  order_code: string;

  @IsString()
  tkt_code: string;

  @IsOptional() @IsDateString() tkt_date?: string;
  @IsOptional() @IsBoolean() apply_min_load_chrg_flag?: boolean;
  @IsOptional() @IsBoolean() apply_zone_chrg_flag?: boolean;
  @IsOptional() @IsBoolean() apply_excess_unld_chrg_flag?: boolean;
  @IsOptional() @IsBoolean() apply_season_chrg_flag?: boolean;
  @IsOptional() @IsBoolean() apply_min_haul_flag?: boolean;

  @IsOptional() @IsString() driv_empl_code?: string;
  @IsOptional() @IsString() hler_code?: string;
  @IsOptional() @IsString() lot_block?: string;
  @IsOptional() @IsString() min_load_chrg_table_id?: string;
  @IsOptional() @IsString() excess_unld_chrg_table_id?: string;
  @IsOptional() @IsString() season_chrg_table_id?: string;
  @IsOptional() @IsString() po?: string;
  @IsOptional() @IsBoolean() rm_print_mix_wgts_flag?: boolean;

  @IsOptional() @IsNumber() rm_water_added_on_job?: number;
  @IsOptional() @IsString() ship_plant_code?: string;
  @IsOptional() @IsString() ship_plant_loc_code?: string;
  @IsOptional() @IsString() scale_code?: string;
  @IsOptional() @IsString() truck_code?: string;
  @IsOptional() @IsString() truck_type?: string;
  @IsOptional() @IsString() delv_meth_code?: string;
  @IsOptional() @IsString() weigh_master_empl_code?: string;
  @IsOptional() @IsString() remove_rsn_code?: string;

  @IsOptional() @IsNumber() cod_amt?: number;
  @IsOptional() @IsNumber() cod_order_amt?: number;
  @IsOptional() @IsNumber() cod_prev_order_amt?: number;
  @IsOptional() @IsNumber() cod_cash_recvd_amt?: number;
  @IsOptional() @IsString() cod_cash_recvd_text?: string;
  @IsOptional() @IsNumber() disc_amt?: number;
  @IsOptional() @IsNumber() disc_tax_amt?: number;

  @IsOptional() @IsBoolean() intfc_flag?: boolean;
  @IsOptional() @IsBoolean() invc_flag?: boolean;
  @IsOptional() @IsString() invc_code?: string;
  @IsOptional() @IsDateString() invc_date?: string;
  @IsOptional() @IsNumber() invc_seq_num?: number;
  @IsOptional() @IsNumber() load_num?: number;

  @IsOptional() @IsString() tax_code?: string;
  @IsOptional() @IsNumber() rm_mix_order_intrnl_line_num?: number;
  @IsOptional() @IsNumber() sched_num?: number;
  @IsOptional() @IsDateString() sched_load_time?: string;
  @IsOptional() @IsString() susp_rsn_code?: string;
  @IsOptional() @IsString() susp_user_name?: string;
  @IsOptional() @IsDateString() susp_date_time?: string;
  @IsOptional() @IsDateString() susp_cancel_date_time?: string;
  @IsOptional() @IsString() susp_cancel_user_name?: string;
  @IsOptional() @IsDateString() typed_time?: string;
  @IsOptional() @IsDateString() load_time?: string;

  // SECOND BLOCK
  @IsOptional() @IsDateString() leave_plant_time?: string;
  @IsOptional() @IsDateString() arrive_job_time?: string;
  @IsOptional() @IsDateString() start_pour_time?: string;
  @IsOptional() @IsDateString() finish_pour_time?: string;
  @IsOptional() @IsDateString() leave_job_time?: string;
  @IsOptional() @IsDateString() return_plant_time?: string;

  @IsOptional() @IsString() stat_code?: string;
  @IsOptional() @IsString() user_name?: string;
  @IsOptional() @IsDateString() stat_date_time?: string;

  @IsOptional() @IsNumber() qty?: number;
  @IsOptional() @IsNumber() qty_load?: number;
  @IsOptional() @IsNumber() qty_sand?: number;
  @IsOptional() @IsNumber() qty_stone?: number;
  @IsOptional() @IsNumber() qty_cement?: number;
  @IsOptional() @IsNumber() qty_water?: number;

  @IsOptional() @IsNumber() amt?: number;
  @IsOptional() @IsNumber() tax_amt?: number;
  @IsOptional() @IsNumber() ticket_seq_num?: number;
  @IsOptional() @IsString() comments?: string;

  @IsOptional() @IsString() pump_code?: string;
  @IsOptional() @IsBoolean() pump_flag?: boolean;
  @IsOptional() @IsNumber() pump_time_min?: number;

  @IsOptional() @IsString() zone_code?: string;
  @IsOptional() @IsNumber() delv_dist?: number;
  @IsOptional() @IsNumber() fuel_surcharge_amt?: number;
  @IsOptional() @IsNumber() energy_surcharge_amt?: number;

  // THIRD BLOCK
  @IsOptional() @IsNumber() truck_time_min?: number;
  @IsOptional() @IsNumber() job_wait_time_min?: number;
  @IsOptional() @IsNumber() plant_wait_time_min?: number;

  @IsOptional() @IsString() min_haul_table_id?: string;
  @IsOptional() @IsNumber() haul_dist?: number;
  @IsOptional() @IsString() haul_zone_code?: string;
  @IsOptional() @IsNumber() haul_amt?: number;

  @IsOptional() @IsString() rm_additive_code?: string;
  @IsOptional() @IsNumber() rm_additive_qty?: number;
  @IsOptional() @IsBoolean() rm_added_at_plant_flag?: boolean;
  @IsOptional() @IsBoolean() rm_added_at_job_flag?: boolean;
  @IsOptional() @IsNumber() rm_additive_amt?: number;

  @IsOptional() @IsNumber() slump?: number;
  @IsOptional() @IsString() batcher_code?: string;
  @IsOptional() @IsString() route_code?: string;
  @IsOptional() @IsString() ticket_type_code?: string;
  @IsOptional() @IsBoolean() manual_flag?: boolean;

  @IsOptional() @IsString() batch_code?: string;
  @IsOptional() @IsDateString() batch_date?: string;
  @IsOptional() @IsNumber() batch_num?: number;

  @IsOptional() @IsString() delv_contact_text?: string;
  @IsOptional() @IsString() delv_phone_text?: string;
  @IsOptional() @IsNumber() zone_delv_dist?: number;

  @IsOptional() @IsDateString() ticket_printed_date_time?: string;
  @IsOptional() @IsString() ticket_printed_user_name?: string;

  @IsOptional() @IsNumber() add_water_qty?: number;
  @IsOptional() @IsBoolean() add_water_flag?: boolean;
  @IsOptional() @IsString() add_water_user_name?: string;
  @IsOptional() @IsDateString() add_water_date_time?: string;
  @IsOptional() @IsNumber() add_water_mixer_rev?: number;

  @IsOptional() @IsBoolean() void_flag?: boolean;
  @IsOptional() @IsString() void_user_name?: string;
  @IsOptional() @IsDateString() void_date_time?: string;
  @IsOptional() @IsString() void_comments?: string;

  @IsOptional() @IsString() unload_code?: string;
  @IsOptional() @IsString() load_size_code?: string;
  @IsOptional() @IsString() addtl_code?: string;
  @IsOptional() @IsNumber() addtl_qty?: number;

  @IsOptional() @IsBoolean() ready_flag?: boolean;
  @IsOptional() @IsString() gps_latitude?: string;
  @IsOptional() @IsString() gps_longitude?: string;
  @IsOptional() @IsDateString() gps_date_time?: string;

  @IsOptional() @IsString() project_code?: string;
  @IsOptional() @IsString() operator_code?: string;
  @IsOptional() @IsBoolean() flagged_for_review_flag?: boolean;
}
