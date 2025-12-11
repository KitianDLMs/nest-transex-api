import { User } from 'src/auth/entities/user.entity';
import { Cust } from 'src/cust/entities/cust.entity';
import { Ordr } from 'src/ordr/entities/ordr.entity';
import { Prjp } from 'src/prjp/entities/prjp.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('proj')
export class Proj {

  @PrimaryColumn({ type: 'text' })
  proj_code: string;

  @Column({ type: 'varchar', nullable: true })
  cust_code?: string;

  // @ManyToOne(() => Cust, cust => cust.projs, { nullable: true })
  // @JoinColumn({ name: 'cust_code' })
  // customer: Cust;

  @Column({ type: 'varchar',  nullable: true })
  proj_name: string;

  @Column({ type: 'varchar',  nullable: true })
  sort_name: string;

  @Column({nullable: true })
  ship_cust_code: string;

  @Column({ nullable: true })
  ref_cust_code: string;

  @Column({ type: 'varchar',  nullable: true })
  po: string;

  @Column({ type: 'varchar',  nullable: true })
  cust_job_num: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  est_qty: number;

  @Column({ type: 'varchar',  nullable: true })
  est_qty_uom: string;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  est_trvl: number;

  @Column({ type: 'varchar',  nullable: true })
  contct_name: string;

  @Column({ type: 'varchar',  nullable: true })
  phone_num_1: string;

  @Column({ type: 'varchar',  nullable: true })
  phone_num_2: string;

  @Column({ type: 'varchar',  nullable: true })
  phone_num_3: string;

  @Column({ type: 'varchar',  nullable: true })
  phone_num_4: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  setup_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  expir_date: Date;

  @Column({ type: 'varchar',  nullable: true })
  invc_name: string;

  @Column({ type: 'varchar',  nullable: true })
  invc_addr_line_1: string;

  @Column({ type: 'varchar',  nullable: true })
  invc_addr_line_2: string;

  @Column({ type: 'varchar',  nullable: true })
  invc_city: string;

  @Column({ nullable: true })
  invc_state: string;

  @Column({ type: 'varchar',  nullable: true })
  invc_cntry: string;

  @Column({ nullable: true })
  invc_postcd: string;

  @Column({ type: 'varchar',  nullable: true })
  stmnt_name: string;

  @Column({ type: 'varchar',  nullable: true })
  stmnt_addr_line_1: string;

  @Column({ type: 'varchar',  nullable: true })
  stmnt_addr_line_2: string;

  @Column({ type: 'varchar',  nullable: true })
  stmnt_city: string;

  @Column({ nullable: true })
  stmnt_state: string;

  @Column({ type: 'varchar',  nullable: true })
  stmnt_cntry: string;

  @Column({ nullable: true })
  stmnt_postcd: string;

  @Column({ type: 'varchar',  nullable: true })
  ship_name: string;

  @Column({ type: 'varchar',  nullable: true })
  ship_addr_line_1: string;

  @Column({ type: 'varchar',  nullable: true })
  ship_addr_line_2: string;

  @Column({ type: 'varchar',  nullable: true })
  ship_city: string;

  @Column({ nullable: true })
  ship_state: string;

  @Column({ type: 'varchar',  nullable: true })
  ship_cntry: string;

  @Column({ nullable: true })
  ship_postcd: string;

  @Column({ type: 'varchar',  nullable: true })
  ca_sales_anl_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_sales_anl_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_sales_anl_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_sales_anl_code: string;

  @Column({ type: 'varchar',  nullable: true })
  ca_slsmn_empl_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_slsmn_empl_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_slsmn_empl_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_slsmn_empl_code: string;

  @Column({ type: 'varchar',  nullable: true })
  tax_code: string;

  @Column({ type: 'numeric', precision: 1, scale: 0, nullable: true })
  taxble_code: number;

  @Column({ type: 'varchar',  nullable: true })
  non_tax_rsn_code: string;

  @Column({ type: 'varchar',  nullable: true })
  ca_price_cat: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_price_cat: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_price_cat: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_price_cat: string;

  @Column({ type: 'varchar',  nullable: true })
  ca_price_plant_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_price_plant_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_price_plant_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_price_plant_code: string;

  @Column({ type: 'numeric', precision: 7, scale: 3, nullable: true })
  ca_trade_disc_pct: number;

  @Column({ type: 'numeric', precision: 7, scale: 3, nullable: true })
  cb_trade_disc_pct: number;

  @Column({ type: 'numeric', precision: 7, scale: 3, nullable: true })
  cc_trade_disc_pct: number;

  @Column({ type: 'numeric', precision: 7, scale: 3, nullable: true })
  cd_trade_disc_pct: number;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  ca_trade_disc_amt: number;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  cb_trade_disc_amt: number;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  cc_trade_disc_amt: number;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  cd_trade_disc_amt: number;

  @Column({ type: 'varchar',  nullable: true })
  ca_trade_disc_amt_uom: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_trade_disc_amt_uom: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_trade_disc_amt_uom: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_trade_disc_amt_uom: string;

  @Column({ type: 'varchar',  nullable: true })
  ca_terms_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_terms_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_terms_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_terms_code: string;

  @Column({ type: 'varchar',  nullable: true })
  ca_cart_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_cart_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_cart_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_cart_code: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  ca_cart_rate: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  cb_cart_rate: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  cc_cart_rate: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  cd_cart_rate: number;

  @Column({ type: 'boolean', default: false })
  ca_apply_min_haul_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_apply_min_haul_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_apply_min_haul_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_apply_min_haul_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  ca_apply_zone_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_apply_zone_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_apply_zone_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_apply_zone_chrg_flag: boolean;

  @Column({ type: 'varchar',  nullable: true })
  ca_zone_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_zone_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_zone_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_zone_code: string;

  @Column({ type: 'boolean', nullable: true })
  ca_apply_min_load_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_apply_min_load_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_apply_min_load_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_apply_min_load_chrg_flag: boolean;

  @Column({ type: 'varchar',  nullable: true })
  ca_min_load_chrg_table_id: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_min_load_chrg_table_id: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_min_load_chrg_table_id: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_min_load_chrg_table_id: string;

  @Column({ type: 'boolean', nullable: true })
  ca_apply_excess_unld_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_apply_excess_unld_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_apply_excess_unld_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_apply_excess_unld_chrg_flag: boolean;

  @Column({ type: 'varchar',  nullable: true })
  ca_excess_unld_chrg_table_id: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_excess_unld_chrg_table_id: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_excess_unld_chrg_table_id: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_excess_unld_chrg_table_id: string;

  @Column({ type: 'boolean', nullable: true })
  ca_apply_season_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_apply_season_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_apply_season_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_apply_season_chrg_flag: boolean;

  @Column({ type: 'varchar',  nullable: true })
  ca_season_chrg_table_id: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_season_chrg_table_id: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_season_chrg_table_id: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_season_chrg_table_id: string;

  @Column({ type: 'boolean', nullable: true })
  ca_apply_sundry_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_apply_sundry_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_apply_sundry_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_apply_sundry_chrg_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  ca_min_load_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_min_load_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_min_load_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_min_load_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  ca_excess_unld_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_excess_unld_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_excess_unld_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_excess_unld_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  ca_season_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_season_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_season_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_season_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  ca_auto_sundry_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_auto_sundry_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_auto_sundry_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_auto_sundry_sep_invc_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  ca_apply_cart_rate_hler_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_apply_cart_rate_hler_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_apply_cart_rate_hler_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_apply_cart_rate_hler_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  ca_apply_sur_rate_hler_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_apply_sur_rate_hler_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_apply_sur_rate_hler_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_apply_sur_rate_hler_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  ca_force_price_uom_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_force_price_uom_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_force_price_uom_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_force_price_uom_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  ca_print_tkt_prices_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_print_tkt_prices_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_print_tkt_prices_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_print_tkt_prices_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  ca_restrict_quoted_prod_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_restrict_quoted_prod_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_restrict_quoted_prod_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_restrict_quoted_prod_flag: boolean;

  @Column({ type: 'varchar',  nullable: true })
  ca_hler_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_hler_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_hler_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_hler_code: string;

  @Column({ type: 'boolean', nullable: true })
  allow_price_adjust_flag: boolean;

  @Column({ type: 'varchar',  nullable: true })
  map_page: string;

  @Column({ type: 'varchar',  nullable: true })
  proj_type: string;

  @Column({ type: 'varchar',  nullable: true })
  proj_stage: string;

  @Column({ type: 'boolean', nullable: true })
  ca_print_mix_wgts_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cb_print_mix_wgts_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cc_print_mix_wgts_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  cd_print_mix_wgts_flag: boolean;

  @Column({ type: 'varchar',  nullable: true })
  ca_sched_plant_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_sched_plant_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_sched_plant_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_sched_plant_code: string;

  @Column({ type: 'varchar',  nullable: true })
  ca_truck_type: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_truck_type: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_truck_type: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_truck_type: string;

  @Column({ type: 'varchar',  nullable: true })
  ca_delv_meth_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cb_delv_meth_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cc_delv_meth_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cd_delv_meth_code: string;

  @Column({ type: 'numeric', precision: 2, scale: 0, nullable: true })
  ca_track_order_color: number;

  @Column({ type: 'numeric', precision: 2, scale: 0, nullable: true })
  cb_track_order_color: number;

  @Column({ type: 'numeric', precision: 2, scale: 0, nullable: true })
  cc_track_order_color: number;

  @Column({ type: 'numeric', precision: 2, scale: 0, nullable: true })
  cd_track_order_color: number;

  @Column({ type: 'varchar',  nullable: true })
  cred_code: string;

  @Column({ type: 'timestamp', nullable: true })
  cred_chng_date: Date;

  @Column({ type: 'boolean', nullable: true })
  po_req_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  lot_block_flag: boolean;

  @Column({ type: 'varchar',  nullable: true })
  acct_cat_code: string;

  @Column({ type: 'varchar',  nullable: true })
  cred_limtn_code: string;

  @Column({ type: 'numeric', precision: 7, scale: 3, nullable: true })
  prepay_pct: number;

  @Column({ type: 'varchar',  nullable: true })
  cred_card_name: string;

  @Column({ type: 'varchar',  nullable: true })
  cred_card_num: string;

  @Column({ type: 'timestamp', nullable: true })
  cred_card_expir_date: Date;

  @Column({ type: 'varchar',  nullable: true })
  cred_card_resp_name: string;

  @Column({ nullable: true })
  invc_grouping_code: string;

  @Column({ nullable: true })
  invc_sub_grouping_code: string;

  @Column({ nullable: true })
  invc_det_sum_code: string;

  @Column({ nullable: true })
  invc_freq_code: string;

  @Column({ type: 'numeric', precision: 2, scale: 0, nullable: true })
  invc_copies: number;

  @Column({ nullable: true })
  invc_single_mult_day_code: string;

  @Column({ type: 'boolean', nullable: true })
  invc_comb_haul_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  invc_show_min_haul_flag: boolean;

  @Column({ type: 'boolean', nullable: true })
  invc_sep_by_prod_line_flag: boolean;

  @Column({ type: 'varchar',  nullable: true })
  metric_cstmry_code: string;

  @Column({ type: 'varchar',  nullable: true })
  map_long: string;

  @Column({ type: 'varchar',  nullable: true })
  map_lat: string;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  map_radius: number;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  intrnl_line_num: number;

  @Column({ type: 'boolean', nullable: true })
  quote_flag: boolean;

  @Column({ type: 'varchar',  nullable: true })
  quote_code: string;

  @Column({ type: 'varchar',  nullable: true })
  job_id: string;

  @Column({ type: 'timestamp', nullable: true })
  dataout_date: Date;

  @Column({ nullable: true })
  sampling_lab_code: string;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  sampling_interval: number;

  @Column({ type: 'varchar',  nullable: true })
  sampling_interval_uom: string;

  @Column({ type: 'varchar',  nullable: true })
  restrict_ordr_by_estqty_code: string;

  @Column({ type: 'numeric', precision: 6, scale: 2, nullable: true })
  max_load_size: number;

  @Column({ type: 'varchar',  nullable: true })
  mobileticket_code: string;

  @Column({ type: 'varchar',  nullable: true })
  trav_restrict_code: string;

  @Column({ type: 'varchar',  nullable: true })
  guid: string;

  @Column({ type: 'varchar',  nullable: true })
  project_status: string;

  @Column({ type: 'varchar',  nullable: true })
  edx_synch_status_code: string;

  @Column({ type: 'varchar',  nullable: true })
  inactive_code: string;

  @Column({ type: 'timestamp', nullable: true })
  inactive_date: Date;

  @Column({ type: 'varchar',  nullable: true })
  use_for_prod_line_code: string;

  @Column({ type: 'timestamp', nullable: true })
  update_date: Date;

  @Column({ type: 'varchar',  nullable: true })
  u_version: string;

  @Column({ type: 'text', nullable: true })
  delv_addr: string;

  @Column({ type: 'text', nullable: true })
  instr: string;

  @Column({ type: 'text', nullable: true })
  tax_exempt_id: string;

  @Column({ type: 'text', nullable: true })
  user_defined: string;

  @Column({ type: 'text', nullable: true })
  ca_order_sur_codes: string;

  @Column({ type: 'text', nullable: true })
  cb_order_sur_codes: string;

  @Column({ type: 'text', nullable: true })
  cc_order_sur_codes: string;

  @Column({ type: 'text', nullable: true })
  cd_order_sur_codes: string;

  @Column({ type: 'text', nullable: true })
  ca_order_sur_rates: string;

  @Column({ type: 'text', nullable: true })
  cb_order_sur_rates: string;

  @Column({ type: 'text', nullable: true })
  cc_order_sur_rates: string;

  @Column({ type: 'text', nullable: true })
  cd_order_sur_rates: string;

  @Column({ type: 'text', nullable: true })
  ca_sundry_chrg_table_ids: string;

  @Column({ type: 'text', nullable: true })
  cb_sundry_chrg_table_ids: string;

  @Column({ type: 'text', nullable: true })
  cc_sundry_chrg_table_ids: string;

  @Column({ type: 'text', nullable: true })
  cd_sundry_chrg_table_ids: string;

  @Column({ type: 'text', nullable: true })
  ca_sundry_chrg_sep_invc_flags: string;

  @Column({ type: 'text', nullable: true })
  cb_sundry_chrg_sep_invc_flags: string;

  @Column({ type: 'text', nullable: true })
  cc_sundry_chrg_sep_invc_flags: string;

  @Column({ type: 'text', nullable: true })
  cd_sundry_chrg_sep_invc_flags: string;

  @OneToMany(() => Prjp, prjp => prjp.project)
  projectDetails: Prjp[];

  @ManyToOne(() => User, (user) => user.projs, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
