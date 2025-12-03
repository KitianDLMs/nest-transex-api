import { IsOptional, IsString, IsNumber, IsDate, IsBoolean } from 'class-validator';

export class CreateOrdlDto {
  @IsDate()
  order_date: Date;

  @IsString()
  order_code: string;

  @IsNumber()
  order_intrnl_line_num: number;

  @IsOptional() @IsNumber()
  sort_line_num?: number;

  @IsOptional() @IsString()
  prod_code?: string;

  @IsOptional() @IsString()
  prod_descr?: string;

  @IsOptional() @IsString()
  short_prod_descr?: string;

  @IsOptional() @IsString()
  prod_cat?: string;

  @IsOptional() @IsNumber()
  price?: number;

  @IsOptional() @IsNumber()
  cstmry_price?: number;

  @IsOptional() @IsNumber()
  metric_price?: number;

  @IsOptional() @IsString()
  price_uom?: string;

  @IsOptional() @IsString()
  cstmry_price_uom?: string;

  @IsOptional() @IsString()
  metric_price_uom?: string;

  @IsOptional() @IsString()
  price_derived_from_code?: string;

  @IsOptional() @IsString()
  price_ext_code?: string;

  @IsOptional() @IsNumber()
  price_qty?: number;

  @IsOptional() @IsBoolean()
  delv_price_flag?: boolean;

  @IsOptional() @IsNumber()
  dflt_load_qty?: number;

  @IsOptional() @IsNumber()
  cstmry_dflt_load_qty?: number;

  @IsOptional() @IsNumber()
  metric_dflt_load_qty?: number;

  @IsOptional() @IsString()
  dflt_load_qty_uom?: string;

  @IsOptional() @IsString()
  order_qty_ext_code?: string;

  @IsOptional() @IsNumber()
  order_dosage_qty?: number;

  @IsOptional() @IsNumber()
  cstmry_order_dosage_qty?: number;

  @IsOptional() @IsNumber()
  metric_order_dosage_qty?: number;

  @IsOptional() @IsString()
  order_dosage_qty_uom?: string;

  @IsOptional() @IsString()
  cstmry_order_dosage_qty_uom?: string;

  @IsOptional() @IsString()
  metric_order_dosage_qty_uom?: string;

  @IsOptional() @IsString()
  price_qty_ext_code?: string;

  @IsOptional() @IsString()
  tkt_qty_ext_code?: string;

  @IsOptional() @IsBoolean()
  cred_price_adj_flag?: boolean;

  @IsOptional() @IsBoolean()
  cred_cost_adj_flag?: boolean;

  @IsOptional() @IsNumber()
  order_qty?: number;

  @IsOptional() @IsNumber()
  cstmry_order_qty?: number;

  @IsOptional() @IsNumber()
  metric_order_qty?: number;

  @IsOptional() @IsString()
  order_qty_uom?: string;

  @IsOptional() @IsString()
  cstmry_order_qty_uom?: string;

  @IsOptional() @IsString()
  metric_order_qty_uom?: string;

  @IsOptional() @IsNumber()
  orig_order_qty?: number;

  @IsOptional() @IsNumber()
  cstmry_orig_order_qty?: number;

  @IsOptional() @IsNumber()
  metric_orig_order_qty?: number;

  @IsOptional() @IsNumber()
  delv_qty?: number;

  @IsOptional() @IsNumber()
  cstmry_delv_qty?: number;

  @IsOptional() @IsNumber()
  metric_delv_qty?: number;

  @IsOptional() @IsString()
  delv_qty_uom?: string;

  @IsOptional() @IsString()
  cstmry_delv_qty_uom?: string;

  @IsOptional() @IsString()
  metric_delv_qty_uom?: string;

  @IsOptional() @IsNumber()
  delv_to_date_qty?: number;

  @IsOptional() @IsNumber()
  cstmry_delv_to_date_qty?: number;

  @IsOptional() @IsNumber()
  metric_delv_to_date_qty?: number;

  @IsOptional() @IsString()
  rm_slump?: string;

  @IsOptional() @IsString()
  rm_slump_uom?: string;

  @IsOptional() @IsBoolean()
  rm_mix_flag?: boolean;

  @IsOptional() @IsString()
  comment_text?: string;

  @IsOptional() @IsString()
  usage_code?: string;

  @IsOptional() @IsNumber()
  taxble_code?: number;

  @IsOptional() @IsString()
  non_tax_rsn_code?: string;

  @IsOptional() @IsBoolean()
  invc_flag?: boolean;

  @IsOptional() @IsBoolean()
  sep_invc_flag?: boolean;

  @IsOptional() @IsString()
  remove_rsn_code?: string;

  @IsOptional() @IsNumber()
  proj_line_num?: number;

  @IsOptional() @IsNumber()
  cust_line_num?: number;

  @IsOptional() @IsNumber()
  curr_load_num?: number;

  @IsOptional() @IsString()
  quote_code?: string;

  @IsOptional() @IsNumber()
  am_min_temp?: number;

  @IsOptional() @IsDate()
  moved_order_date?: Date;

  @IsOptional() @IsString()
  moved_to_order_code?: string;

  @IsOptional() @IsString()
  moved_from_order_code?: string;

  @IsOptional() @IsString()
  invy_adjust_code?: string;

  @IsOptional() @IsString()
  sales_anl_adjust_code?: string;

  @IsOptional() @IsString()
  mix_design_user_name?: string;

  @IsOptional() @IsDate()
  mix_design_update_date?: Date;

  @IsOptional() @IsBoolean()
  qc_approvl_flag?: boolean;

  @IsOptional() @IsDate()
  qc_approvl_date?: Date;

  @IsOptional() @IsString()
  batch_code?: string;

  @IsOptional() @IsString()
  chrg_cart_code?: string;

  @IsOptional() @IsNumber()
  cart_rate_amt?: number;

  @IsOptional() @IsString()
  quote_rev_num?: string;

  @IsOptional() @IsString()
  type_price?: string;

  @IsOptional() @IsNumber()
  matl_price?: number;

  @IsOptional() @IsString()
  mix_sent_to_lab_status?: string;

  @IsOptional() @IsDate()
  lab_transfer_date?: Date;

  @IsOptional() @IsString()
  auth_user_name?: string;

  @IsOptional() @IsNumber()
  linked_prod_seq_num?: number;

  @IsOptional() @IsNumber()
  linked_prod_time_gap?: number;

  @IsOptional() @IsString()
  cart_cat?: string;

  @IsOptional() @IsNumber()
  additional_samples?: number;

  @IsOptional() @IsBoolean()
  apply_to_contract?: boolean;

  @IsOptional() @IsNumber()
  contracted_samples?: number;

  @IsOptional() @IsBoolean()
  exclude_from_sample_sched_rpt?: boolean;

  @IsOptional() @IsNumber()
  total_samples_to_take?: number;

  @IsOptional() @IsNumber()
  pct_hydrate?: number;

  @IsOptional() @IsString()
  pumped_indicator_code?: string;

  @IsOptional() @IsNumber()
  writeoff_qty?: number;

  @IsOptional() @IsBoolean()
  writeoff_first_load_flag?: boolean;

  @IsOptional() @IsString()
  record_origin_code?: string;

  @IsOptional() @IsString()
  other_form_chng_code?: string;

  @IsOptional() @IsDate()
  update_date?: Date;

  @IsOptional() @IsString()
  u_version?: string;

  @IsOptional() @IsString()
  cart_plant_codes?: string;

  @IsOptional() @IsString()
  cart_truck_types?: string;

  @IsOptional() @IsString()
  cart_rates?: string;

  @IsOptional() @IsString()
  sur_codes?: string;

  @IsOptional() @IsString()
  sur_rate_amts?: string;

  @IsOptional() @IsString()
  apply_sur_rate_hler_flags?: string;

  @IsOptional() @IsString()
  sundry_chrg_table_ids?: string;

  @IsOptional() @IsString()
  sundry_chrg_sep_invc_flags?: string;

  @IsOptional() @IsString()
  apply_sundry_chrg_flags?: string;

  @IsOptional() @IsString()
  lot_num_list?: string;
}
