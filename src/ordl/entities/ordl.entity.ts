import { Ordr } from 'src/ordr/entities/ordr.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('ORDL')
export class Ordl {
  @PrimaryColumn()
  order_date: Date;

  @PrimaryColumn()
  order_code: string;

  @PrimaryColumn()
  order_intrnl_line_num: number;

  @Column({ nullable: true })
  sort_line_num: number;

  @Column({ nullable: true })
  prod_code: string;

  @Column({ nullable: true })
  prod_descr: string;

  @Column({ nullable: true })
  short_prod_descr: string;

  @Column({ nullable: true })
  prod_cat: string;

  @Column({ type: 'numeric', nullable: true })
  price: number;

  @Column({ type: 'numeric', nullable: true })
  cstmry_price: number;

  @Column({ type: 'numeric', nullable: true })
  metric_price: number;

  @Column({ nullable: true })
  price_uom: string;

  @Column({ nullable: true })
  cstmry_price_uom: string;

  @Column({ nullable: true })
  metric_price_uom: string;

  @Column({ nullable: true })
  price_derived_from_code: string;

  @Column({ nullable: true })
  price_ext_code: string;

  @Column({ type: 'numeric', nullable: true })
  price_qty: number;

  @Column({ nullable: true })
  delv_price_flag: boolean;

  @Column({ type: 'numeric', nullable: true })
  dflt_load_qty: number;

  @Column({ type: 'numeric', nullable: true })
  cstmry_dflt_load_qty: number;

  @Column({ type: 'numeric', nullable: true })
  metric_dflt_load_qty: number;

  @Column({ nullable: true })
  dflt_load_qty_uom: string;

  @Column({ nullable: true })
  order_qty_ext_code: string;

  @Column({ type: 'numeric', nullable: true })
  order_dosage_qty: number;

  @Column({ type: 'numeric', nullable: true })
  cstmry_order_dosage_qty: number;

  @Column({ type: 'numeric', nullable: true })
  metric_order_dosage_qty: number;

  @Column({ nullable: true })
  order_dosage_qty_uom: string;

  @Column({ nullable: true })
  cstmry_order_dosage_qty_uom: string;

  @Column({ nullable: true })
  metric_order_dosage_qty_uom: string;

  @Column({ nullable: true })
  price_qty_ext_code: string;

  @Column({ nullable: true })
  tkt_qty_ext_code: string;

  @Column({ nullable: true })
  cred_price_adj_flag: boolean;

  @Column({ nullable: true })
  cred_cost_adj_flag: boolean;

  @Column({ type: 'numeric', nullable: true })
  order_qty: number;

  @Column({ type: 'numeric', nullable: true })
  cstmry_order_qty: number;

  @Column({ type: 'numeric', nullable: true })
  metric_order_qty: number;

  @Column({ nullable: true })
  order_qty_uom: string;

  @Column({ nullable: true })
  cstmry_order_qty_uom: string;

  @Column({ nullable: true })
  metric_order_qty_uom: string;

  @Column({ type: 'numeric', nullable: true })
  orig_order_qty: number;

  @Column({ type: 'numeric', nullable: true })
  cstmry_orig_order_qty: number;

  @Column({ type: 'numeric', nullable: true })
  metric_orig_order_qty: number;

  @Column({ type: 'numeric', nullable: true })
  delv_qty: number;

  @Column({ type: 'numeric', nullable: true })
  cstmry_delv_qty: number;

  @Column({ type: 'numeric', nullable: true })
  metric_delv_qty: number;

  @Column({ nullable: true })
  delv_qty_uom: string;

  @Column({ nullable: true })
  cstmry_delv_qty_uom: string;

  @Column({ nullable: true })
  metric_delv_qty_uom: string;

  @Column({ type: 'numeric', nullable: true })
  delv_to_date_qty: number;

  @Column({ type: 'numeric', nullable: true })
  cstmry_delv_to_date_qty: number;

  @Column({ type: 'numeric', nullable: true })
  metric_delv_to_date_qty: number;

  @Column({ nullable: true })
  rm_slump: string;

  @Column({ nullable: true })
  rm_slump_uom: string;

  @Column({ nullable: true })
  rm_mix_flag: boolean;

  @Column({ nullable: true })
  comment_text: string;

  @Column({ nullable: true })
  usage_code: string;

  @Column({ type: 'numeric', nullable: true })
  taxble_code: number;

  @Column({ nullable: true })
  non_tax_rsn_code: string;

  @Column({ nullable: true })
  invc_flag: boolean;

  @Column({ nullable: true })
  sep_invc_flag: boolean;

  @Column({ nullable: true })
  remove_rsn_code: string;

  @Column({ type: 'numeric', nullable: true })
  proj_line_num: number;

  @Column({ type: 'numeric', nullable: true })
  cust_line_num: number;

  @Column({ type: 'numeric', nullable: true })
  curr_load_num: number;

  @Column({ nullable: true })
  quote_code: string;

  @Column({ type: 'numeric', nullable: true })
  am_min_temp: number;

  @Column({ nullable: true })
  moved_order_date: Date;

  @Column({ nullable: true })
  moved_to_order_code: string;

  @Column({ nullable: true })
  moved_from_order_code: string;

  @Column({ nullable: true })
  invy_adjust_code: string;

  @Column({ nullable: true })
  sales_anl_adjust_code: string;

  @Column({ nullable: true })
  mix_design_user_name: string;

  @Column({ nullable: true })
  mix_design_update_date: Date;

  @Column({ nullable: true })
  qc_approvl_flag: boolean;

  @Column({ nullable: true })
  qc_approvl_date: Date;

  @Column({ nullable: true })
  batch_code: string;

  @Column({ nullable: true })
  chrg_cart_code: string;

  @Column({ type: 'numeric', nullable: true })
  cart_rate_amt: number;

  @Column({ nullable: true })
  quote_rev_num: string;

  @Column({ nullable: true })
  type_price: string;

  @Column({ type: 'numeric', nullable: true })
  matl_price: number;

  @Column({ nullable: true })
  mix_sent_to_lab_status: string;

  @Column({ nullable: true })
  lab_transfer_date: Date;

  @Column({ nullable: true })
  auth_user_name: string;

  @Column({ type: 'numeric', nullable: true })
  linked_prod_seq_num: number;

  @Column({ type: 'numeric', nullable: true })
  linked_prod_time_gap: number;

  @Column({ nullable: true })
  cart_cat: string;

  @Column({ type: 'numeric', nullable: true })
  additional_samples: number;

  @Column({ nullable: true })
  apply_to_contract: boolean;

  @Column({ type: 'numeric', nullable: true })
  contracted_samples: number;

  @Column({ nullable: true })
  exclude_from_sample_sched_rpt: boolean;

  @Column({ type: 'numeric', nullable: true })
  total_samples_to_take: number;

  @Column({ type: 'numeric', nullable: true })
  pct_hydrate: number;

  @Column({ nullable: true })
  pumped_indicator_code: string;

  @Column({ type: 'numeric', nullable: true })
  writeoff_qty: number;

  @Column({ nullable: true })
  writeoff_first_load_flag: boolean;

  @Column({ nullable: true })
  record_origin_code: string;

  @Column({ nullable: true })
  other_form_chng_code: string;

  @Column({ nullable: true })
  update_date: Date;

  @Column({ nullable: true })
  u_version: string;

  @Column({ type: 'text', nullable: true })
  cart_plant_codes: string;

  @Column({ type: 'text', nullable: true })
  cart_truck_types: string;

  @Column({ type: 'text', nullable: true })
  cart_rates: string;

  @Column({ type: 'text', nullable: true })
  sur_codes: string;

  @Column({ type: 'text', nullable: true })
  sur_rate_amts: string;

  @Column({ type: 'text', nullable: true })
  apply_sur_rate_hler_flags: string;

  @Column({ type: 'text', nullable: true })
  sundry_chrg_table_ids: string;

  @Column({ type: 'text', nullable: true })
  sundry_chrg_sep_invc_flags: string;

  @Column({ type: 'text', nullable: true })
  apply_sundry_chrg_flags: string;

  @Column({ type: 'text', nullable: true })
  lot_num_list: string;

  @ManyToOne(() => Ordr, (order) => order.orderDetails, { onDelete: 'CASCADE' })
  order: Ordr;

}
