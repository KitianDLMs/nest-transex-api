import * as bcrypt from 'bcrypt';

interface SeedProduct {
    description: string;
    images: string[];
    stock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';

interface SeedObra {
    name: string;
    location: string;
    budget: number;
    startDate: string;
    endDate: string;
    description: string;
    estado: string;     
    responsable: string;
    progreso: number;   
}

interface SeedCust {
  cust_code: string;
  name?: string;
  sort_name?: string;
  addr_line_1?: string;
  addr_line_2?: string;
  addr_city?: string;
  addr_state?: string;
  addr_cntry?: string;
  addr_postcd?: string;
  contct_name?: string;
  phone_num_1?: string;
  phone_num_2?: string;
  phone_num_3?: string;
  phone_num_4?: string;
  setup_date: string;
}

interface SeedImst {
  item_code: string;
  descr?: string;
  short_descr?: string;
  invy_flag?: boolean;
  taxble_code?: number;
  tax_rate_code?: number;
  usage_code?: string;
  non_tax_rsn_code?: string;
  item_cat?: string;
  matl_type?: string;
  invy_item_code?: string;
  print_on_tkt_flag?: boolean;
  print_qty_on_tkt_flag?: boolean;
  order_uom?: string;
  price_uom?: string;
  invy_uom?: string;
  purch_uom?: string;
  batch_uom?: string;
  rpt_uom?: string;
  price_admix_flag?: boolean;
  agg_size?: string;
  cem_type?: string;
  days_to_strgth?: number;
  max_water?: number;
  water_cem_ratio?: number;
  pct_air?: number;
  slump?: string;
  slump_uom?: string;
  strgth?: number;
  strgth_uom?: string;
  water_hold?: number;
  terms_disc_flag?: boolean;
  trade_disc_flag?: boolean;
  expir_date?: string;
  serial_num_flag?: boolean;
  lot_num_flag?: boolean;
  resale_flag?: boolean;
  const_flag?: boolean;
  cust_code?: string;
  proj_code?: string;
  min_temp?: number;
  min_temp_uom?: string;
  pct_recycle?: number;
  order_qty_ext_code?: string;
  order_dosage_qty?: number;
  order_dosage_qty_uom?: string;
  price_qty_ext_code?: string;
  tkt_qty_ext_code?: string;
  user_defined?: string;
  update_date?: string;
  u_version?: string;
}

interface SeedOrdl {
  order_date: string;
  order_code: string;
  order_intrnl_line_num: number;

  sort_line_num?: number;
  prod_code?: string;
  prod_descr?: string;
  short_prod_descr?: string;
  prod_cat?: string;
  price?: number;
  cstmry_price?: number;
  metric_price?: number;
  price_uom?: string;
  cstmry_price_uom?: string;
  metric_price_uom?: string;
  price_derived_from_code?: string;
  price_ext_code?: string;
  price_qty?: number;
  delv_price_flag?: boolean;
  dflt_load_qty?: number;
  cstmry_dflt_load_qty?: number;
  metric_dflt_load_qty?: number;
  dflt_load_qty_uom?: string;
  order_qty_ext_code?: string;
  order_dosage_qty?: number;
  cstmry_order_dosage_qty?: number;
  metric_order_dosage_qty?: number;
  order_dosage_qty_uom?: string;
  cstmry_order_dosage_qty_uom?: string;
  metric_order_dosage_qty_uom?: string;
  price_qty_ext_code?: string;
  tkt_qty_ext_code?: string;
  cred_price_adj_flag?: boolean;
  cred_cost_adj_flag?: boolean;
  order_qty?: number;
  cstmry_order_qty?: number;
  metric_order_qty?: number;
  order_qty_uom?: string;
  cstmry_order_qty_uom?: string;
  metric_order_qty_uom?: string;
  orig_order_qty?: number;
  cstmry_orig_order_qty?: number;
  metric_orig_order_qty?: number;
  delv_qty?: number;
  cstmry_delv_qty?: number;
  metric_delv_qty?: number;
  delv_qty_uom?: string;
  cstmry_delv_qty_uom?: string;
  metric_delv_qty_uom?: string;
  delv_to_date_qty?: number;
  cstmry_delv_to_date_qty?: number;
  metric_delv_to_date_qty?: number;
  rm_slump?: string;
  rm_slump_uom?: string;
  rm_mix_flag?: boolean;
  comment_text?: string;
  usage_code?: string;
  taxble_code?: number;
  non_tax_rsn_code?: string;
  invc_flag?: boolean;
  sep_invc_flag?: boolean;
  remove_rsn_code?: string;
  proj_line_num?: number;
  cust_line_num?: number;
  curr_load_num?: number;
  quote_code?: string;
  am_min_temp?: number;
  moved_order_date?: string;
  moved_to_order_code?: string;
  moved_from_order_code?: string;
  invy_adjust_code?: string;
  sales_anl_adjust_code?: string;
  mix_design_user_name?: string;
  mix_design_update_date?: string;
  qc_approvl_flag?: boolean;
  qc_approvl_date?: string;
  batch_code?: string;
  chrg_cart_code?: string;
  cart_rate_amt?: number;
  quote_rev_num?: string;
  type_price?: string;
  matl_price?: number;
  mix_sent_to_lab_status?: string;
  lab_transfer_date?: string;
  auth_user_name?: string;
  linked_prod_seq_num?: number;
  linked_prod_time_gap?: number;
  cart_cat?: string;
  additional_samples?: number;
  apply_to_contract?: boolean;
  contracted_samples?: number;
  exclude_from_sample_sched_rpt?: boolean;
  total_samples_to_take?: number;
  pct_hydrate?: number;
  pumped_indicator_code?: string;
  writeoff_qty?: number;
  writeoff_first_load_flag?: boolean;
  record_origin_code?: string;
  other_form_chng_code?: string;
  update_date?: string;
  u_version?: string;
  cart_plant_codes?: string;
  cart_truck_types?: string;
  cart_rates?: string;
  sur_codes?: string;
  sur_rate_amts?: string;
  apply_sur_rate_hler_flags?: string;
  sundry_chrg_table_ids?: string;
  sundry_chrg_sep_invc_flags?: string;
  apply_sundry_chrg_flags?: string;
  lot_num_list?: string;
}

interface SeedOrdr {
  order_date: string;          
  order_code: string;          
  order_type?: string;         
  prod_line_code?: string;     
  stat?: string;               
  cust_code?: string;          
  ship_cust_code?: string;     
  ref_cust_code?: string;      
  cust_name?: string;          
  cust_sort_name?: string;     
  proj_code?: string;          
  zone_code?: string;          
  lot_block?: string;          
  cust_job_num?: string;       
  po?: string;                 
  taken_by_empl_code?: string; 
  taken_on_phone_line_num?: number; 
  order_by_name?: string;      
  order_by_phone_num?: string; 
  apply_min_load_chrg_flag?: boolean; 
  apply_zone_chrg_flag?: boolean;     
  apply_excess_unld_chrg_flag?: boolean; 
  apply_season_chrg_flag?: boolean;   
  apply_min_haul_pay_flag?: boolean;  
  rm_print_mix_wgts_flag?: boolean;   
  price_plant_code?: string;          
  price_plant_loc_code?: string;      
  comp_code?: string;                 
  hler_code?: string;                 
  min_load_chrg_table_id?: string;    
  excess_unld_chrg_table_id?: string; 
  season_chrg_table_id?: string;      
  min_load_sep_invc_flag?: boolean;   
  excess_unld_sep_invc_flag?: boolean;
  season_sep_invc_flag?: boolean;     
  sales_anl_code?: string;            
  slsmn_empl_code?: string;           
  taxble_code?: number;               
  tax_code?: string;                  
  non_tax_rsn_code?: string;          
  susp_rsn_code?: string;             
  susp_user_name?: string;            
  susp_date_time?: string;            
  susp_cancel_date_time?: string;     
  susp_cancel_user_name?: string;     
  remove_rsn_code?: string;           
  memo_rsn_code?: string;             
  pkt_num?: string;                   
  track_order_color?: number;         
  intrnl_line_num?: number;           
  curr_load_num?: number;             
  cod_order_amt?: number;             
  invc_code?: string;                 
  setup_date?: string;                
  quote_code?: string;                
  delv_addr?: string;                 
  instr?: string;                     
  user_defined?: string;              
  sur_codes?: string;                 
  sur_rate_amts?: string;             
  apply_sur_rate_hler_flags?: string; 
  sundry_chrg_table_ids?: string;     
  apply_sundry_chrg_flags?: string;  
  sundry_chrg_sep_invc_flags?: string;
  sundry_chrg_comb_meth_code?: string;
  sundry_chrg_override_rates?: string;
  order_msgs?: string;                
  apply_pump_unld_chrg_flag?: string; 
  pump_unld_chrg_table_id?: string;   
  apply_pump_sundry_chrg_flags?: string; 
  pump_sundry_chrg_table_ids?: string;    
  pump_sundry_chrg_over_rates?: string;   
  update_date?: Date;
}

interface SeedPrjp {
  cust_code: string;
  proj_code: string;
  intrnl_line_num: number;

  sort_line_num?: number;
  prod_code?: string;
  batch_code?: string;
  prod_descr?: string;
  est_qty?: number;
  rm_slump?: string;
  rm_slump_uom?: string;
  usage_code?: string;
  short_prod_descr?: string;
  price_uom?: string;
  price?: number;
  price_ext_code?: string;
  price_plant_code?: string;
  price_expir_date?: string;
  effect_date?: string;
  prev_price?: number;
  prev_price_ext_code?: string;
  delv_price_flag?: boolean;
  dflt_load_qty?: number;
  order_qty_uom?: string;
  order_qty_ext_code?: string;
  order_dosage_qty?: number;
  order_dosage_qty_uom?: string;
  delv_qty_uom?: string;
  price_qty_ext_code?: string;
  tkt_qty_ext_code?: string;
  mix_type?: string;
  item_type?: string;
  quote_code?: string;
  allow_price_adjust_flag?: boolean;
  sep_invc_flag?: boolean;
  override_terms_disc_flag?: boolean;
  disc_rate_type?: string;
  disc_amt?: number;
  disc_amt_uom?: string;
  content_up_price?: number;
  content_down_price?: number;
  content_up_price_effect_date?: string;
  content_down_price_effect_date?: string;
  prev_content_up_price?: number;
  prev_content_down_price?: number;
  ca_chrg_cart_code?: string;
  cb_chrg_cart_code?: string;
  cc_chrg_cart_code?: string;
  cd_chrg_cart_code?: string;
  job_quote_unique_line_num?: number;
  pour_meth_code?: string;
  ca_truck_type?: string;
  cb_truck_type?: string;
  cc_truck_type?: string;
  cd_truck_type?: string;
  ca_chrg_cart_rate?: number;
  cb_chrg_cart_rate?: number;
  cc_chrg_cart_rate?: number;
  cd_chrg_cart_rate?: number;
  quote_rev_num?: string;
  modified_date?: string;
  type_price?: string;
  matl_price?: number;
  auto_prod_flag?: boolean;
  item_cat_price_flag?: boolean;
  auth_user_name?: string;
  price_status?: string;
  unique_line_num?: number;
  sampling_interval?: number;
  sampling_interval_uom?: string;
  sampling_qty_bal_forward?: number;
  sampling_count_bal_forward?: number;
  max_age_of_concrete?: number;
  writeoff_qty?: number;
  writeoff_first_load_flag?: boolean;
  update_date?: string;
  u_version?: string;
  ca_sur_codes?: string;
  cb_sur_codes?: string;
  cc_sur_codes?: string;
  cd_sur_codes?: string;
  ca_sur_rates?: string;
  cb_sur_rates?: string;
  cc_sur_rates?: string;
  cd_sur_rates?: string;
  ca_sundry_chrg_table_ids?: string;
  cb_sundry_chrg_table_ids?: string;
  cc_sundry_chrg_table_ids?: string;
  cd_sundry_chrg_table_ids?: string;
  ca_sundry_chrg_sep_invc_flags?: string;
  cb_sundry_chrg_sep_invc_flags?: string;
  cc_sundry_chrg_sep_invc_flags?: string;
  cd_sundry_chrg_sep_invc_flags?: string;
}

interface SeedProj {
  cust_code: string;
  proj_code: string;
  proj_name?: string;
  sort_name?: string;
  ship_cust_code?: string;
  ref_cust_code?: string;
  po?: string;
  cust_job_num?: string;
  est_qty?: number;
  est_qty_uom?: string;
  est_trvl?: number;
  contct_name?: string;
  phone_num_1?: string;
  phone_num_2?: string;
  phone_num_3?: string;
  phone_num_4?: string;
  setup_date: Date;
  expir_date?: Date;
  invc_name?: string;
  invc_addr_line_1?: string;
  invc_addr_line_2?: string;
  invc_city?: string;
  invc_state?: string;
  invc_cntry?: string;
  invc_postcd?: string;
  stmnt_name?: string;
  stmnt_addr_line_1?: string;
  stmnt_addr_line_2?: string;
  stmnt_city?: string;
  stmnt_state?: string;
  stmnt_cntry?: string;
  stmnt_postcd?: string;
  ship_name?: string;
  ship_addr_line_1?: string;
  ship_addr_line_2?: string;
  ship_city?: string;
  ship_state?: string;
  ship_cntry?: string;
  ship_postcd?: string;
  ca_sales_anl_code?: string;
  cb_sales_anl_code?: string;
  cc_sales_anl_code?: string;
  cd_sales_anl_code?: string;
  ca_slsmn_empl_code?: string;
  cb_slsmn_empl_code?: string;
  cc_slsmn_empl_code?: string;
  cd_slsmn_empl_code?: string;
  tax_code?: string;
  taxble_code?: number;
  non_tax_rsn_code?: string;
  ca_price_cat?: string;
  cb_price_cat?: string;
  cc_price_cat?: string;
  cd_price_cat?: string;
  ca_price_plant_code?: string;
  cb_price_plant_code?: string;
  cc_price_plant_code?: string;
  cd_price_plant_code?: string;
  ca_trade_disc_pct?: number;
  cb_trade_disc_pct?: number;
  cc_trade_disc_pct?: number;
  cd_trade_disc_pct?: number;
  ca_trade_disc_amt?: number;
  cb_trade_disc_amt?: number;
  cc_trade_disc_amt?: number;
  cd_trade_disc_amt?: number;
  ca_trade_disc_amt_uom?: string;
  cb_trade_disc_amt_uom?: string;
  cc_trade_disc_amt_uom?: string;
  cd_trade_disc_amt_uom?: string;
  ca_terms_code?: string;
  cb_terms_code?: string;
  cc_terms_code?: string;
  cd_terms_code?: string;
  ca_cart_code?: string;
  cb_cart_code?: string;
  cc_cart_code?: string;
  cd_cart_code?: string;
  ca_cart_rate?: number;
  cb_cart_rate?: number;
  cc_cart_rate?: number;
  cd_cart_rate?: number;
  ca_apply_min_haul_flag?: boolean;
  cb_apply_min_haul_flag?: boolean;
  cc_apply_min_haul_flag?: boolean;
  cd_apply_min_haul_flag?: boolean;
  ca_apply_zone_chrg_flag?: boolean;
  cb_apply_zone_chrg_flag?: boolean;
  cc_apply_zone_chrg_flag?: boolean;
  cd_apply_zone_chrg_flag?: boolean;
  ca_zone_code?: string;
  cb_zone_code?: string;
  cc_zone_code?: string;
  cd_zone_code?: string;
  ca_apply_min_load_chrg_flag?: boolean;
  cb_apply_min_load_chrg_flag?: boolean;
  cc_apply_min_load_chrg_flag?: boolean;
  cd_apply_min_load_chrg_flag?: boolean;
  ca_min_load_chrg_table_id?: string;
  cb_min_load_chrg_table_id?: string;
  cc_min_load_chrg_table_id?: string;
  cd_min_load_chrg_table_id?: string;
  ca_apply_excess_unld_chrg_flag?: boolean;
  cb_apply_excess_unld_chrg_flag?: boolean;
  cc_apply_excess_unld_chrg_flag?: boolean;
  cd_apply_excess_unld_chrg_flag?: boolean;
  ca_excess_unld_chrg_table_id?: string;
  cb_excess_unld_chrg_table_id?: string;
  cc_excess_unld_chrg_table_id?: string;
  cd_excess_unld_chrg_table_id?: string;
  ca_apply_season_chrg_flag?: boolean;
  cb_apply_season_chrg_flag?: boolean;
  cc_apply_season_chrg_flag?: boolean;
  cd_apply_season_chrg_flag?: boolean;
  ca_season_chrg_table_id?: string;
  cb_season_chrg_table_id?: string;
  cc_season_chrg_table_id?: string;
  cd_season_chrg_table_id?: string;
  ca_apply_sundry_chrg_flag?: boolean;
  cb_apply_sundry_chrg_flag?: boolean;
  cc_apply_sundry_chrg_flag?: boolean;
  cd_apply_sundry_chrg_flag?: boolean;
  ca_min_load_sep_invc_flag?: boolean;
  cb_min_load_sep_invc_flag?: boolean;
  cc_min_load_sep_invc_flag?: boolean;
  cd_min_load_sep_invc_flag?: boolean;
  ca_excess_unld_sep_invc_flag?: boolean;
  cb_excess_unld_sep_invc_flag?: boolean;
  cc_excess_unld_sep_invc_flag?: boolean;
  cd_excess_unld_sep_invc_flag?: boolean;
  ca_season_sep_invc_flag?: boolean;
  cb_season_sep_invc_flag?: boolean;
  cc_season_sep_invc_flag?: boolean;
  cd_season_sep_invc_flag?: boolean;
  ca_auto_sundry_sep_invc_flag?: boolean;
  cb_auto_sundry_sep_invc_flag?: boolean;
  cc_auto_sundry_sep_invc_flag?: boolean;
  cd_auto_sundry_sep_invc_flag?: boolean;
  ca_apply_cart_rate_hler_flag?: boolean;
  cb_apply_cart_rate_hler_flag?: boolean;
  cc_apply_cart_rate_hler_flag?: boolean;
  cd_apply_cart_rate_hler_flag?: boolean;
  ca_apply_sur_rate_hler_flag?: boolean;
  cb_apply_sur_rate_hler_flag?: boolean;
  cc_apply_sur_rate_hler_flag?: boolean;
  cd_apply_sur_rate_hler_flag?: boolean;
  ca_force_price_uom_flag?: boolean;
  cb_force_price_uom_flag?: boolean;
  cc_force_price_uom_flag?: boolean;
  cd_force_price_uom_flag?: boolean;
  ca_print_tkt_prices_flag?: boolean;
  cb_print_tkt_prices_flag?: boolean;
  cc_print_tkt_prices_flag?: boolean;
  cd_print_tkt_prices_flag?: boolean;
  ca_restrict_quoted_prod_flag?: boolean;
  cb_restrict_quoted_prod_flag?: boolean;
  cc_restrict_quoted_prod_flag?: boolean;
  cd_restrict_quoted_prod_flag?: boolean;
  ca_hler_code?: string;
  cb_hler_code?: string;
  cc_hler_code?: string;
  cd_hler_code?: string;
  allow_price_adjust_flag?: boolean;
  map_page?: string;
  proj_type?: string;
  proj_stage?: string;
  ca_print_mix_wgts_flag?: boolean;
  cb_print_mix_wgts_flag?: boolean;
  cc_print_mix_wgts_flag?: boolean;
  cd_print_mix_wgts_flag?: boolean;
  ca_sched_plant_code?: string;
  cb_sched_plant_code?: string;
  cc_sched_plant_code?: string;
  cd_sched_plant_code?: string;
  ca_truck_type?: string;
  cb_truck_type?: string;
  cc_truck_type?: string;
  cd_truck_type?: string;
  ca_delv_meth_code?: string;
  cb_delv_meth_code?: string;
  cc_delv_meth_code?: string;
  cd_delv_meth_code?: string;
  ca_track_order_color?: number;
  cb_track_order_color?: number;
  cc_track_order_color?: number;
  cd_track_order_color?: number;
  cred_code?: string;
  cred_chng_date?: Date;
  po_req_flag?: boolean;
  lot_block_flag?: boolean;
  acct_cat_code?: string;
  cred_limtn_code?: string;
  prepay_pct?: number;
  cred_card_name?: string;
  cred_card_num?: string;
  cred_card_expir_date?: Date;
  cred_card_resp_name?: string;
  invc_grouping_code?: string;
  invc_sub_grouping_code?: string;
  invc_det_sum_code?: string;
  invc_freq_code?: string;
  invc_copies?: number;
  invc_single_mult_day_code?: string;
  invc_comb_haul_flag?: boolean;
  invc_show_min_haul_flag?: boolean;
  invc_sep_by_prod_line_flag?: boolean;
  metric_cstmry_code?: string;
  map_long?: string;
  map_lat?: string;
  map_radius?: number;
  intrnl_line_num?: number;
  quote_flag?: boolean;
  quote_code?: string;
  job_id?: string;
  dataout_date?: Date;
  sampling_lab_code?: string;
  sampling_interval?: number;
  sampling_interval_uom?: string;
  restrict_ordr_by_estqty_code?: string;
  max_load_size?: number;
  mobileticket_code?: string;
  trav_restrict_code?: string;
  guid?: string;
  project_status?: string;
  edx_synch_status_code?: string;
  inactive_code?: string;
  inactive_date?: Date;
  use_for_prod_line_code?: string;
  update_date?: Date;
  u_version?: string;
  delv_addr?: string;
  instr?: string;
  tax_exempt_id?: string;
  user_defined?: string;
  ca_order_sur_codes?: string;
  cb_order_sur_codes?: string;
  cc_order_sur_codes?: string;
  cd_order_sur_codes?: string;
  ca_order_sur_rates?: string;
  cb_order_sur_rates?: string;
  cc_order_sur_rates?: string;
  cd_order_sur_rates?: string;
  ca_sundry_chrg_table_ids?: string;
  cb_sundry_chrg_table_ids?: string;
  cc_sundry_chrg_table_ids?: string;
  cd_sundry_chrg_table_ids?: string;
  ca_sundry_chrg_sep_invc_flags?: string;
  cb_sundry_chrg_sep_invc_flags?: string;
  cc_sundry_chrg_sep_invc_flags?: string;
  cd_sundry_chrg_sep_invc_flags?: string;
}

interface SeedSchl {
  order_date: Date;  
  order_code: string;
  proj_code: string; 
  schl_code: string; 
  qty: number;       
  status?: string;   
  order_intrnl_line_num?: number;
  sched_num: number;
  unique_num: number;
  load_num: number;
  tkt_code: string;
  truck_code: string;
  from_plant_code: string;
  to_plant_code: string;
  load_size: number;
  fixed_time_flag: boolean;
  fixed_qty_flag: boolean;
  remove_rsn_code: any;
  on_job_time: Date;
  orig_on_job_time: Date;
  to_job_trvl_time: number;
  fixed_to_job_trvl_time_code: string;
  to_plant_trvl_time: number; 
  fixed_to_plant_trvl_time_code: string;
  unld_time: number;
  fixed_unld_time_code: string;
  orig_on_job_time_agree_flag: boolean;
  cleanup_flag: boolean;
  truck_spacing_mins: number;
  fixed_spacing_flag: boolean;
  fixed_to_plant_flag: boolean;
  travel_time: number;
  unload_time: number;
  travel_time_update: Date;
  unload_time_update: Date;
  assign_truck_code: string;
  guid: string;
  pump_end_pouring_time: Date;
  from_pump_schedule_flag: boolean;
  on_job_time_design_value: Date;
  unld_time_design_value: number;
  truck_spacing_min_design_value: number;
  pump_truck_setup_time: number;
  pump_truck_uninstall_time: number;
  job_washdown_time: number;
  journey_code: string;
  journey_seq_code: number;
  journey_date: Date;
  update_date: Date;
  u_version: string;

}

export interface SeedTick {
  
  order_date?: Date;
  order_code?: string;
  tkt_code?: string;
  
  tkt_date?: Date | null;
  apply_min_load_chrg_flag?: boolean | null;
  apply_zone_chrg_flag?: boolean | null;
  apply_excess_unld_chrg_flag?: boolean | null;
  apply_season_chrg_flag?: boolean | null;
  apply_min_haul_flag?: boolean | null;
  driv_empl_code?: string | null;
  hler_code?: string | null;
  lot_block?: string | null;
  min_load_chrg_table_id?: string | null;
  excess_unld_chrg_table_id?: string | null;
  season_chrg_table_id?: string | null;
  po?: string | null;
  rm_print_mix_wgts_flag?: boolean | null;
  rm_water_added_on_job?: number | null;
  ship_plant_code?: string | null;
  ship_plant_loc_code?: string | null;
  scale_code?: string | null;
  truck_code?: string | null;
  truck_type?: string | null;
  delv_meth_code?: string | null;
  weigh_master_empl_code?: string | null;
  remove_rsn_code?: string | null;
  cod_amt?: number | null;
  cod_order_amt?: number | null;
  cod_prev_order_amt?: number | null;
  cod_cash_recvd_amt?: number | null;
  cod_cash_recvd_text?: string | null;
  disc_amt?: number | null;
  disc_tax_amt?: number | null;
  intfc_flag?: boolean | null;
  invc_flag?: boolean | null;
  invc_code?: string | null;
  invc_date?: Date | null;
  invc_seq_num?: number | null;
  load_num?: number | null;
  tax_code?: string | null;
  rm_mix_order_intrnl_line_num?: number | null;
  sched_num?: number | null;
  sched_load_time?: Date | null;
  susp_rsn_code?: string | null;
  susp_user_name?: string | null;
  susp_date_time?: Date | null;
  susp_cancel_date_time?: Date | null;
  susp_cancel_user_name?: string | null;
  typed_time?: Date | null;
  load_time?: Date | null;
  loaded_time?: Date | null;
  to_job_time?: Date | null;
  on_job_time?: Date | null;
  begin_unld_time?: Date | null;
  end_unld_time?: Date | null;
  distance?: number;
  post_trvl_time?: number;
  post_trvl_flag?: boolean;
  map_long?: any;
  map_lat?: any;
  truck_tare_wgt?: number;
  truck_tare_wgt_uom?: string;
  truck_net_wgt?: number;
  truck_gross_wgt?: number;
  truck_gross_wgt_uom?: string;
  prim_trlr_code?: any;
  prim_trlr_intrnl_line_num?: any;
  prim_trlr_tare_wgt?: any;
  prim_trlr_tare_wgt_uom?: any;
  prim_trlr_net_wgt?: any;
  prim_trlr_net_wgt_uom?: any;
  prim_trlr_gross_wgt?: any;
  prim_trlr_gross_wgt_uom?: any;
  truck_net_wgt_uom?: string;
  scndry_trlr_code?: any;
  scndry_trlr_intrnl_line_num?: any;
  scndry_trlr_tare_wgt?: any;
  scndry_trlr_tare_wgt_uom?: any;
  scndry_trlr_net_wgt?: any;
  scndry_trlr_net_wgt_uom?: any;
  scndry_trlr_gross_wgt?: any;
  tkt_status?: string;
  scndry_trlr_gross_wgt_uom?: any;
  tkt_user_name?: string;
  man_wgt_flag?: boolean;
  modified_date?: Date;
  wgts_meth_code?: string;
  reused_order_date?: any;
  reused_order_code?: any;
  alley_code?: any;
  
  leave_plant_time?: Date | null;
  arrive_job_time?: Date | null;
  start_pour_time?: Date | null;
  finish_pour_time?: Date | null;
  leave_job_time?: Date | null;
  return_plant_time?: Date | null;
  stat_code?: string | null;
  user_name?: string | null;
  stat_date_time?: Date | null;
  qty?: number | null;
  qty_load?: number | null;
  qty_sand?: number | null;
  qty_stone?: number | null;
  qty_cement?: number | null;
  qty_water?: number | null;
  amt?: number | null;
  tax_amt?: number | null;
  ticket_seq_num?: number | null;
  comments?: string | null;
  pump_code?: string | null;
  pump_flag?: boolean | null;
  pump_time_min?: number | null;
  zone_code?: string | null;
  delv_dist?: number | null;
  fuel_surcharge_amt?: number | null;
  energy_surcharge_amt?: number | null;

  // THIRD BLOCK
  truck_time_min?: number | null;
  job_wait_time_min?: number | null;
  plant_wait_time_min?: number | null;
  min_haul_table_id?: string | null;
  haul_dist?: number | null;
  haul_zone_code?: string | null;
  haul_amt?: number | null;
  rm_additive_code?: string | null;
  rm_additive_qty?: number | null;
  rm_added_at_plant_flag?: boolean | null;
  rm_added_at_job_flag?: boolean | null;
  rm_additive_amt?: number | null;
  slump?: number | null;
  batcher_code?: string | null;
  route_code?: string | null;
  ticket_type_code?: string | null;
  manual_flag?: boolean | null;
  batch_code?: string | null;
  batch_date?: Date | null;
  batch_num?: number | null;
  delv_contact_text?: string | null;
  delv_phone_text?: string | null;
  zone_delv_dist?: number | null;
  ticket_printed_date_time?: Date | null;
  ticket_printed_user_name?: string | null;
  add_water_qty?: number | null;
  add_water_flag?: boolean | null;
  add_water_user_name?: string | null;
  add_water_date_time?: Date | null;
  add_water_mixer_rev?: number | null;
  void_flag?: boolean | null;
  void_user_name?: string | null;
  void_date_time?: Date | null;
  void_comments?: string | null;
  unload_code?: string | null;
  load_size_code?: string | null;
  addtl_code?: string | null;
  addtl_qty?: number | null;
  ready_flag?: boolean | null;
  gps_latitude?: string | null;
  gps_longitude?: string | null;
  gps_date_time?: Date | null;
  project_code?: string | null;
  operator_code?: string | null;
  flagged_for_review_flag?: boolean | null;
  
  truck_assgn_flag?: boolean;
  job_phase?: string | null;
  qc_stat?: string | null;
  job_code?: string | null;
  phase_code?: string | null;
  pmt_amt?: number | null;
  ship_to_plant_code?: string | null;
  pmt_meth?: string | null;
  dataout_date?: Date | null;
  tkt_code_alt?: string | null;
  pmt_form_code?: string | null;
  opt_dataout_date?: Date | null;
  inventory_post_stat?: string | null;
  exclude_from_ontm_flag?: boolean;
  ml_load_num?: number | null;
  batch_unit_actl_mix_load_size?: number | null;
  batch_unit_actl_batch_code?: string | null;
  batch_in_tolerance_flag?: boolean | null;
  batch_actual_truck?: string | null;
  batch_actual_batch_time?: Date | null;
  conc_max_gross_wgt?: number | null;
  conc_max_gross_wgt_uom?: string | null;
}


interface SeedUser {
    email:    string;
    fullName: string;
    password: string;
    roles:     string[];
}


interface SeedData {
    users: SeedUser[];
    // products: SeedProduct[];
    // obras: SeedObra[];
    cust: SeedCust[];
    imst: SeedImst[];
    ordl: SeedOrdl[];
    ordr: SeedOrdr[];
    prjp: SeedPrjp[];
    proj: SeedProj[];
    schl: SeedSchl[];
    tick: SeedTick[];
}


export const initialData: SeedData = {

    users: [
        {
            email: 'test1@google.com',
            fullName: 'Test One',
            password: bcrypt.hashSync( 'Abc123', 10 ),
            roles: ['admin']
        },
        {
            email: 'test2@google.com',
            fullName: 'Test Two',
            password: bcrypt.hashSync( 'Abc123', 10 ),
            roles: ['user','super']
        }
    ],
     cust: [
        {
            cust_code: 'SOENCO001',
            name: 'SOENCO Geotecnia Ltda',
            sort_name: 'SOENCO',
            addr_line_1: 'Jaime Repullo 326',
            addr_line_2: '',
            addr_city: 'Concepción',
            addr_state: 'BIO',
            addr_cntry: 'CL',
            addr_postcd: '4030000',
            contct_name: 'No informado',
            phone_num_1: '',
            phone_num_2: '',
            phone_num_3: '',
            phone_num_4: '',
            setup_date: '2025-11-20T00:00:00'
        },
        {
            cust_code: 'WALDO0032',
            name: 'Waldo Sánchez Román',
            sort_name: 'WALDO',
            addr_line_1: 'San Enrique 867',
            addr_line_2: '',
            addr_city: 'Villa Alemana',
            addr_state: 'VS',
            addr_cntry: 'CL',
            addr_postcd: '6500000',
            contct_name: 'Waldo Sánchez',
            phone_num_1: '',
            phone_num_2: '',
            phone_num_3: '',
            phone_num_4: '',
            setup_date: '2025-11-20T00:00:00'
        },
        {
            cust_code: 'ABAESTE01',
            name: 'Abastecedora Equipos Sudamericana',
            sort_name: 'ABAST',
            addr_line_1: 'Av. Consistorial 2380',
            addr_line_2: '',
            addr_city: 'Santiago',
            addr_state: 'RM',
            addr_cntry: 'CL',
            addr_postcd: '8320000',
            contct_name: 'No informado',
            phone_num_1: '',
            phone_num_2: '',
            phone_num_3: '',
            phone_num_4: '',
            setup_date: '2025-11-20T00:00:00'
        }
    ],
    imst: [
    {
      cust_code: 'C001',
      proj_code: 'P001',
      item_code: 'H20-000001',
      descr: 'Hormigón H20 Normal',
      short_descr: 'H20',
      invy_flag: true,
      taxble_code: 1,
      tax_rate_code: 1,
      usage_code: 'RMX',
      item_cat: 'HORMIG',
      matl_type: 'C',
      invy_item_code: 'H20-000001',
      print_on_tkt_flag: true,
      print_qty_on_tkt_flag: true,
      order_uom: 'M3',
      price_uom: 'M3',
      invy_uom: 'M3',
      purch_uom: 'M3',
      batch_uom: 'M3',
      rpt_uom: 'M3',
      price_admix_flag: false,
      agg_size: 'GR-20',
      cem_type: 'CEM32',
      days_to_strgth: 28,
      max_water: 180.0,
      water_cem_ratio: 0.55,
      pct_air: 2.0,
      slump: '100-120',
      slump_uom: 'MM',
      strgth: 20.0,
      strgth_uom: 'MPA',
      water_hold: 0,
      const_flag: true,
      update_date: '2025-11-21T00:00:00',
      u_version: '1'
    },
    {
      cust_code: 'C002',
      proj_code: 'P002',
      item_code: 'H25-000001',
      descr: 'Hormigón H25 Estructural',
      short_descr: 'H25',
      invy_flag: true,
      taxble_code: 1,
      tax_rate_code: 1,
      usage_code: 'RMX',
      item_cat: 'HORMIG',
      matl_type: 'C',
      invy_item_code: 'H25-000001',
      print_on_tkt_flag: true,
      print_qty_on_tkt_flag: true,
      order_uom: 'M3',
      price_uom: 'M3',
      invy_uom: 'M3',
      purch_uom: 'M3',
      batch_uom: 'M3',
      rpt_uom: 'M3',
      agg_size: 'GR-20',
      cem_type: 'CEM32',
      days_to_strgth: 28,
      max_water: 175.0,
      water_cem_ratio: 0.50,
      pct_air: 2.5,
      slump: '100-120',
      slump_uom: 'MM',
      strgth: 25.0,
      strgth_uom: 'MPA',
      water_hold: 0,
      const_flag: true,
      update_date: '2025-11-21T00:00:00',
      u_version: '1'
    }
    ],
    ordl: [
    {
      order_date: "2025-11-22T08:00:00",
      order_code: "ORD10001",
      order_intrnl_line_num: 1,
      prod_code: "H20-000001",
      prod_descr: "Hormigón H20 Normal",
      price: 52000,
      price_uom: "M3",
      order_qty: 8,
      order_qty_uom: "M3",
      delv_qty: 0,
      usage_code: "RMX",
      invc_flag: false,
      update_date: "2025-11-22T00:00:00",
      u_version: "1",
    },
    {
      order_date: "2025-11-22T08:00:00",
      order_code: "ORD-10002",
      order_intrnl_line_num: 2,
      prod_code: "BOM-0001",
      prod_descr: "Bomba Pluma 32m",
      price: 150000,
      price_uom: "PZS",
      order_qty: 1,
      usage_code: "SRV",
      invc_flag: false,
      update_date: "2025-11-22T00:00:00",
      u_version: "1",
    }
    ],
    ordr: [
        {
            order_date: "2025-11-22T08:00:00",
            order_code: "ORD10001",
            order_type: "N",
            cust_code: null,
            curr_load_num: 1,
            cod_order_amt: 416000,
            invc_code: "INV-1001",
            delv_addr: "Av. Siempre Viva 123",
            instr: "Entregar en horario de oficina"
        }
    ],
    prjp: [
        {
        cust_code: 'CUST001',
        proj_code: 'PROJ001',
        intrnl_line_num: 1,
        prod_code: 'H20-0001',
        prod_descr: 'Hormigón H20 Normal',
        est_qty: 100,
        price: 52000,
        price_uom: 'M3',
        update_date: '2025-11-22T00:00:00',
        u_version: '1',
        },
        {
        cust_code: 'CUST001',
        proj_code: 'PROJ002',
        intrnl_line_num: 2,
        prod_code: 'BOM-0001',
        prod_descr: 'Bomba Pluma 32m',
        price: 150000,
        price_uom: 'PZS',
        est_qty: 1,
        update_date: '2025-11-22T00:00:00',
        u_version: '1',
        }
    ],
    proj: [
        {
        cust_code: 'CUST001',
        proj_code: 'PROJ001',
        proj_name: 'Proyecto Ejemplo',
        sort_name: 'EXAMP',

        ship_cust_code: null,
        ref_cust_code: null,

        po: 'PO12345',
        cust_job_num: 'JOB001',

        est_qty: 1000,
        est_qty_uom: 'KG',
        est_trvl: 50,

        contct_name: 'Juan Pérez',
        phone_num_1: '123456789',
        phone_num_2: null,
        phone_num_3: null,
        phone_num_4: null,

        setup_date: new Date('2025-11-22'),
        expir_date: new Date('2025-12-31'),

        invc_name: 'Cliente Ejemplo',
        invc_addr_line_1: null,
        invc_addr_line_2: null,
        invc_city: null,
        invc_state: null,
        invc_cntry: null,
        invc_postcd: null,

        stmnt_name: null,
        stmnt_addr_line_1: null,
        stmnt_addr_line_2: null,
        stmnt_city: null,
        stmnt_state: null,
        stmnt_cntry: null,
        stmnt_postcd: null,

        ship_name: null,
        ship_addr_line_1: null,
        ship_addr_line_2: null,
        ship_city: null,
        ship_state: null,
        ship_cntry: null,
        ship_postcd: null,

        ca_sales_anl_code: null,
        cb_sales_anl_code: null,
        cc_sales_anl_code: null,
        cd_sales_anl_code: null,

        ca_slsmn_empl_code: null,
        cb_slsmn_empl_code: null,
        cc_slsmn_empl_code: null,
        cd_slsmn_empl_code: null,

        tax_code: null,
        taxble_code: 0,
        non_tax_rsn_code: null,

        ca_price_cat: null,
        cb_price_cat: null,
        cc_price_cat: null,
        cd_price_cat: null,

        ca_price_plant_code: null,
        cb_price_plant_code: null,
        cc_price_plant_code: null,
        cd_price_plant_code: null,

        ca_trade_disc_pct: 0,
        cb_trade_disc_pct: 0,
        cc_trade_disc_pct: 0,
        cd_trade_disc_pct: 0,

        ca_trade_disc_amt: 0,
        cb_trade_disc_amt: 0,
        cc_trade_disc_amt: 0,
        cd_trade_disc_amt: 0,

        ca_trade_disc_amt_uom: null,
        cb_trade_disc_amt_uom: null,
        cc_trade_disc_amt_uom: null,
        cd_trade_disc_amt_uom: null,

        ca_terms_code: null,
        cb_terms_code: null,
        cc_terms_code: null,
        cd_terms_code: null,

        ca_cart_code: null,
        cb_cart_code: null,
        cc_cart_code: null,
        cd_cart_code: null,

        ca_cart_rate: 0,
        cb_cart_rate: 0,
        cc_cart_rate: 0,
        cd_cart_rate: 0,

        ca_apply_min_haul_flag: true,
        cb_apply_min_haul_flag: true,
        cc_apply_min_haul_flag: false,
        cd_apply_min_haul_flag: false,

        ca_apply_zone_chrg_flag: false,
        cb_apply_zone_chrg_flag: false,
        cc_apply_zone_chrg_flag: false,
        cd_apply_zone_chrg_flag: false,

        ca_zone_code: null,
        cb_zone_code: null,
        cc_zone_code: null,
        cd_zone_code: null,

        ca_apply_min_load_chrg_flag: false,
        cb_apply_min_load_chrg_flag: false,
        cc_apply_min_load_chrg_flag: false,
        cd_apply_min_load_chrg_flag: false,

        ca_min_load_chrg_table_id: null,
        cb_min_load_chrg_table_id: null,
        cc_min_load_chrg_table_id: null,
        cd_min_load_chrg_table_id: null,

        ca_apply_excess_unld_chrg_flag: false,
        cb_apply_excess_unld_chrg_flag: false,
        cc_apply_excess_unld_chrg_flag: false,
        cd_apply_excess_unld_chrg_flag: false,

        ca_excess_unld_chrg_table_id: null,
        cb_excess_unld_chrg_table_id: null,
        cc_excess_unld_chrg_table_id: null,
        cd_excess_unld_chrg_table_id: null,

        ca_apply_season_chrg_flag: false,
        cb_apply_season_chrg_flag: false,
        cc_apply_season_chrg_flag: false,
        cd_apply_season_chrg_flag: false,

        ca_season_chrg_table_id: null,
        cb_season_chrg_table_id: null,
        cc_season_chrg_table_id: null,
        cd_season_chrg_table_id: null,

        ca_apply_sundry_chrg_flag: false,
        cb_apply_sundry_chrg_flag: false,
        cc_apply_sundry_chrg_flag: false,
        cd_apply_sundry_chrg_flag: false,

        ca_min_load_sep_invc_flag: false,
        cb_min_load_sep_invc_flag: false,
        cc_min_load_sep_invc_flag: false,
        cd_min_load_sep_invc_flag: false,

        ca_excess_unld_sep_invc_flag: false,
        cb_excess_unld_sep_invc_flag: false,
        cc_excess_unld_sep_invc_flag: false,
        cd_excess_unld_sep_invc_flag: false,

        ca_season_sep_invc_flag: false,
        cb_season_sep_invc_flag: false,
        cc_season_sep_invc_flag: false,
        cd_season_sep_invc_flag: false,

        ca_auto_sundry_sep_invc_flag: false,
        cb_auto_sundry_sep_invc_flag: false,
        cc_auto_sundry_sep_invc_flag: false,
        cd_auto_sundry_sep_invc_flag: false,

        ca_apply_cart_rate_hler_flag: false,
        cb_apply_cart_rate_hler_flag: false,
        cc_apply_cart_rate_hler_flag: false,
        cd_apply_cart_rate_hler_flag: false,

        ca_apply_sur_rate_hler_flag: false,
        cb_apply_sur_rate_hler_flag: false,
        cc_apply_sur_rate_hler_flag: false,
        cd_apply_sur_rate_hler_flag: false,

        ca_force_price_uom_flag: false,
        cb_force_price_uom_flag: false,
        cc_force_price_uom_flag: false,
        cd_force_price_uom_flag: false,

        ca_print_tkt_prices_flag: false,
        cb_print_tkt_prices_flag: false,
        cc_print_tkt_prices_flag: false,
        cd_print_tkt_prices_flag: false,

        ca_restrict_quoted_prod_flag: false,
        cb_restrict_quoted_prod_flag: false,
        cc_restrict_quoted_prod_flag: false,
        cd_restrict_quoted_prod_flag: false,

        ca_hler_code: null,
        cb_hler_code: null,
        cc_hler_code: null,
        cd_hler_code: null,

        allow_price_adjust_flag: false,
        map_page: null,
        proj_type: null,
        proj_stage: null,

        ca_print_mix_wgts_flag: false,
        cb_print_mix_wgts_flag: false,
        cc_print_mix_wgts_flag: false,
        cd_print_mix_wgts_flag: false,

        ca_sched_plant_code: null,
        cb_sched_plant_code: null,
        cc_sched_plant_code: null,
        cd_sched_plant_code: null,

        ca_truck_type: null,
        cb_truck_type: null,
        cc_truck_type: null,
        cd_truck_type: null,

        ca_delv_meth_code: null,
        cb_delv_meth_code: null,
        cc_delv_meth_code: null,
        cd_delv_meth_code: null,

        ca_track_order_color: 0,
        cb_track_order_color: 0,
        cc_track_order_color: 0,
        cd_track_order_color: 0,

        cred_code: null,
        cred_chng_date: null,

        po_req_flag: false,
        lot_block_flag: false,

        acct_cat_code: null,
        cred_limtn_code: null,
        prepay_pct: 0,

        cred_card_name: null,
        cred_card_num: null,
        cred_card_expir_date: null,
        cred_card_resp_name: null,

        invc_grouping_code: null,
        invc_sub_grouping_code: null,
        invc_det_sum_code: null,
        invc_freq_code: null,
        invc_copies: 0,

        invc_single_mult_day_code: null,
        invc_comb_haul_flag: false,
        invc_show_min_haul_flag: false,
        invc_sep_by_prod_line_flag: false,

        metric_cstmry_code: null,

        map_long: null,
        map_lat: null,
        map_radius: 0,

        intrnl_line_num: 1,
        quote_flag: false,
        quote_code: null,
        job_id: null,
        dataout_date: null,

        sampling_lab_code: null,
        sampling_interval: 0,
        sampling_interval_uom: null,

        restrict_ordr_by_estqty_code: null,
        max_load_size: 0,
        mobileticket_code: null,
        trav_restrict_code: null,

        guid: 'guid-001',
        project_status: 'ACTIVE',
        edx_synch_status_code: null,
        inactive_code: null,
        inactive_date: null,
        use_for_prod_line_code: null,
        update_date: new Date(),

        u_version: '1',
        delv_addr: null,
        instr: null,
        tax_exempt_id: null,

        user_defined: null,

        ca_order_sur_codes: null,
        cb_order_sur_codes: null,
        cc_order_sur_codes: null,
        cd_order_sur_codes: null,

        ca_order_sur_rates: null,
        cb_order_sur_rates: null,
        cc_order_sur_rates: null,
        cd_order_sur_rates: null,

        ca_sundry_chrg_table_ids: null,
        cb_sundry_chrg_table_ids: null,
        cc_sundry_chrg_table_ids: null,
        cd_sundry_chrg_table_ids: null,

        ca_sundry_chrg_sep_invc_flags: null,
        cb_sundry_chrg_sep_invc_flags: null,
        cc_sundry_chrg_sep_invc_flags: null,
        cd_sundry_chrg_sep_invc_flags: null,
        }
    ],
    schl: [
        {
            order_date: new Date("2025-01-10T08:00:00"),
            order_code: "ORD000000001",
            order_intrnl_line_num: 1,  
            sched_num: 1,              
            unique_num: 100000000001,  
            proj_code: "PROJ001",
            schl_code: "SCHL001",
            qty: 12,
            load_num: 12,
            tkt_code: "TCK00001",            
            truck_code: "TRUCK00001",
            from_plant_code: "001",  
            to_plant_code: "002",    
            load_size: 12.50,        

            fixed_time_flag: false,
            fixed_qty_flag: false,

            remove_rsn_code: null,
            on_job_time: new Date("2025-01-10T08:30:00"),
            orig_on_job_time: new Date("2025-01-10T08:25:00"),

            to_job_trvl_time: 15,
            fixed_to_job_trvl_time_code: "N",

            to_plant_trvl_time: 20,
            fixed_to_plant_trvl_time_code: "N",

            unld_time: 30.00,
            fixed_unld_time_code: "N",

            orig_on_job_time_agree_flag: true,
            cleanup_flag: false,

            truck_spacing_mins: 10.00,
            fixed_spacing_flag: false,

            fixed_to_plant_flag: false,
            travel_time: 25,
            unload_time: 45,

            travel_time_update: new Date("2025-01-10T08:10:00"),
            unload_time_update: new Date("2025-01-10T09:00:00"),

            assign_truck_code: "TRUCK00002",  
            guid: "123e4567-e89b-12d3-a456-426614174000", 

            pump_end_pouring_time: new Date("2025-01-10T09:30:00"),
            from_pump_schedule_flag: false,

            on_job_time_design_value: new Date("2025-01-10T08:40:00"),

            unld_time_design_value: 35.00,
            truck_spacing_min_design_value: 9.00,

            pump_truck_setup_time: 20,
            pump_truck_uninstall_time: 15,
            job_washdown_time: 10,

            journey_code: "JRNY01",          
            journey_seq_code: 1,
            journey_date: new Date("2025-01-10T08:00:00"),
            update_date: new Date("2025-01-10T09:30:00"),

            u_version: "1",                  
        },
    ],
    tick: [
        {
            order_date: new Date('2025-11-20T00:00:00'),
            order_code: '110120000001',    // 12 chars
            tkt_code: 'TK000001',          // 8 chars

            tkt_date: new Date('2025-11-20T08:15:00'),
            apply_min_load_chrg_flag: false,
            apply_zone_chrg_flag: false,
            apply_excess_unld_chrg_flag: false,
            apply_season_chrg_flag: false,
            apply_min_haul_flag: false,

            driv_empl_code: 'DRV000000001',
            hler_code: 'HL001000',
            lot_block: 'BLOQUE001',
            min_load_chrg_table_id: null,
            excess_unld_chrg_table_id: null,
            season_chrg_table_id: null,
            po: null,

            rm_print_mix_wgts_flag: false,
            rm_water_added_on_job: 0,
            ship_plant_code: '001',
            ship_plant_loc_code: 'A001',
            scale_code: '001',

            truck_code: 'TRUCK001',
            truck_type: 'M1',
            delv_meth_code: '01',
            weigh_master_empl_code: null,

            remove_rsn_code: null,
            cod_amt: 0,
            cod_order_amt: 0,
            cod_prev_order_amt: 0,
            cod_cash_recvd_amt: 0,
            cod_cash_recvd_text: null,
            disc_amt: 0,
            disc_tax_amt: 0,

            intfc_flag: false,
            invc_flag: false,
            invc_code: null,
            invc_date: null,
            invc_seq_num: null,
            load_num: 1,
            tax_code: '001',
            rm_mix_order_intrnl_line_num: null,
            sched_num: 1,
            sched_load_time: new Date('2025-11-20T08:00:00'),

            // tiempos principales
            typed_time: new Date('2025-11-20T08:05:00'),
            load_time: new Date('2025-11-20T08:10:00'),
            loaded_time: new Date('2025-11-20T08:12:00'),
            to_job_time: new Date('2025-11-20T08:25:00'),
            on_job_time: new Date('2025-11-20T08:40:00'),
            begin_unld_time: new Date('2025-11-20T08:45:00'),
            end_unld_time: new Date('2025-11-20T08:55:00'),

            distance: 12.5,
            post_trvl_time: 0,
            post_trvl_flag: false,
            map_long: null,
            map_lat: null,

            // Pesos
            truck_tare_wgt: 8500,
            truck_tare_wgt_uom: 'KG',
            truck_net_wgt: 12000,
            truck_gross_wgt: 20500,
            truck_gross_wgt_uom: 'KG',

            // Restantes (todos nulos)
            prim_trlr_code: null,
            prim_trlr_intrnl_line_num: null,
            prim_trlr_tare_wgt: null,
            prim_trlr_tare_wgt_uom: null,
            prim_trlr_net_wgt: null,
            prim_trlr_net_wgt_uom: null,
            prim_trlr_gross_wgt: null,
            prim_trlr_gross_wgt_uom: null,

            truck_net_wgt_uom: 'KG',

            scndry_trlr_code: null,
            scndry_trlr_intrnl_line_num: null,
            scndry_trlr_tare_wgt: null,
            scndry_trlr_tare_wgt_uom: null,
            scndry_trlr_net_wgt: null,
            scndry_trlr_net_wgt_uom: null,
            scndry_trlr_gross_wgt: null,
            scndry_trlr_gross_wgt_uom: null,

            man_wgt_flag: false,
            wgts_meth_code: 'I',

            reused_order_date: null,
            reused_order_code: null,
            alley_code: null,
            truck_assgn_flag: false,
            job_phase: null,
            qc_stat: null,
            job_code: null,
            phase_code: null,

            pmt_amt: 0,
            ship_to_plant_code: null,
            pmt_meth: null,

            modified_date: new Date(),
            dataout_date: null,
            tkt_code_alt: null,
            pmt_form_code: null,
            opt_dataout_date: null,

            inventory_post_stat: null,
            tkt_status: 'I',
            tkt_user_name: 'SYSTEM',
            exclude_from_ontm_flag: false,

            ml_load_num: null,
            batch_unit_actl_mix_load_size: null,
            batch_unit_actl_batch_code: null,
            batch_in_tolerance_flag: null,
            batch_actual_truck: null,
            batch_actual_batch_time: null,
            conc_max_gross_wgt: null,
            conc_max_gross_wgt_uom: null,

            // resto nulos (demasiados para escribir uno por uno)
            // el 100% de los campos restantes se pueden dejar en null
        },

        // ---------------------------
        // Segundo registro
        // ---------------------------
        {
            order_date: new Date('2025-11-21T00:00:00'),
            order_code: '110120000002',
            tkt_code: 'TK000002',

            tkt_date: new Date('2025-11-21T09:20:00'),
            apply_min_load_chrg_flag: false,
            apply_zone_chrg_flag: true,
            apply_excess_unld_chrg_flag: false,
            apply_season_chrg_flag: false,
            apply_min_haul_flag: false,

            driv_empl_code: 'DRV000000002',
            hler_code: 'HL001002',
            lot_block: 'BLOQUE003',
            min_load_chrg_table_id: null,
            excess_unld_chrg_table_id: null,
            season_chrg_table_id: null,
            po: null,

            rm_print_mix_wgts_flag: false,
            rm_water_added_on_job: 0,
            ship_plant_code: '002',
            ship_plant_loc_code: 'A002',
            scale_code: '002',

            truck_code: 'TRUCK002',
            truck_type: 'M2',
            delv_meth_code: '02',
            weigh_master_empl_code: null,

            load_num: 1,
            tax_code: '002',
            sched_num: 1,
            sched_load_time: new Date('2025-11-21T09:00:00'),

            typed_time: new Date('2025-11-21T09:05:00'),
            load_time: new Date('2025-11-21T09:10:00'),
            loaded_time: new Date('2025-11-21T09:13:00'),
            to_job_time: new Date('2025-11-21T09:25:00'),
            on_job_time: new Date('2025-11-21T09:45:00'),
            begin_unld_time: new Date('2025-11-21T09:50:00'),
            end_unld_time: new Date('2025-11-21T10:00:00'),

            distance: 8.9,
            post_trvl_time: 0,
            post_trvl_flag: false,

            truck_tare_wgt: 8200,
            truck_tare_wgt_uom: 'KG',
            truck_net_wgt: 13500,
            truck_gross_wgt: 21700,
            truck_gross_wgt_uom: 'KG',

            tkt_status: 'I',
            tkt_user_name: 'SYSTEM',

            modified_date: new Date(),
        }
    ]
};