import { Proj } from 'src/proj/entities/proj.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity('prjp')
export class Prjp {
  @PrimaryColumn({ length: 10 })
  cust_code: string;

  @PrimaryColumn({ length: 12 })
  proj_code: string;

  @PrimaryColumn({ type: 'numeric', precision: 4, scale: 0 })
  intrnl_line_num: number;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  sort_line_num: number;

  @Column({ length: 12, nullable: true })
  prod_code: string;

  @Column({ length: 12, nullable: true })
  batch_code: string;

  @Column({ length: 40, nullable: true })
  prod_descr: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  est_qty: number;

  @Column({ length: 8, nullable: true })
  rm_slump: string;

  @Column({ length: 5, nullable: true })
  rm_slump_uom: string;

  @Column({ length: 4, nullable: true })
  usage_code: string;

  @Column({ length: 16, nullable: true })
  short_prod_descr: string;

  @Column({ length: 5, nullable: true })
  price_uom: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  price: number;

  @Column({ length: 1, nullable: true })
  price_ext_code: string;

  @Column({ length: 3, nullable: true })
  price_plant_code: string;

  @Column({ type: 'timestamp', nullable: true })
  price_expir_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  effect_date: Date;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  prev_price: number;

  @Column({ length: 1, nullable: true })
  prev_price_ext_code: string;

  @Column({ type: 'bit', nullable: true })
  delv_price_flag: boolean;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  dflt_load_qty: number;

  @Column({ length: 5, nullable: true })
  order_qty_uom: string;

  @Column({ length: 1, nullable: true })
  order_qty_ext_code: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  order_dosage_qty: number;

  @Column({ length: 5, nullable: true })
  order_dosage_qty_uom: string;

  @Column({ length: 5, nullable: true })
  delv_qty_uom: string;

  @Column({ length: 1, nullable: true })
  price_qty_ext_code: string;

  @Column({ length: 1, nullable: true })
  tkt_qty_ext_code: string;

  @Column({ length: 1, nullable: true })
  mix_type: string;

  @Column({ length: 2, nullable: true })
  item_type: string;

  @Column({ length: 15, nullable: true })
  quote_code: string;

  @Column({ type: 'bit', nullable: true })
  allow_price_adjust_flag: boolean;

  @Column({ type: 'bit', nullable: true })
  sep_invc_flag: boolean;

  @Column({ type: 'bit', nullable: true })
  override_terms_disc_flag: boolean;

  @Column({ length: 1, nullable: true })
  disc_rate_type: string;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  disc_amt: number;

  @Column({ length: 5, nullable: true })
  disc_amt_uom: string;

  @Column({ type: 'numeric', precision: 12, scale: 3, nullable: true })
  content_up_price: number;

  @Column({ type: 'numeric', precision: 12, scale: 3, nullable: true })
  content_down_price: number;

  @Column({ type: 'timestamp', nullable: true })
  content_up_price_effect_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  content_down_price_effect_date: Date;

  @Column({ type: 'numeric', precision: 12, scale: 3, nullable: true })
  prev_content_up_price: number;

  @Column({ type: 'numeric', precision: 12, scale: 3, nullable: true })
  prev_content_down_price: number;

  @Column({ length: 3, nullable: true })
  ca_chrg_cart_code: string;

  @Column({ length: 3, nullable: true })
  cb_chrg_cart_code: string;

  @Column({ length: 3, nullable: true })
  cc_chrg_cart_code: string;

  @Column({ length: 3, nullable: true })
  cd_chrg_cart_code: string;

  @Column({ type: 'numeric', precision: 12, scale: 0, nullable: true })
  job_quote_unique_line_num: number;

  @Column({ length: 4, nullable: true })
  pour_meth_code: string;

  @Column({ length: 2, nullable: true })
  ca_truck_type: string;

  @Column({ length: 2, nullable: true })
  cb_truck_type: string;

  @Column({ length: 2, nullable: true })
  cc_truck_type: string;

  @Column({ length: 2, nullable: true })
  cd_truck_type: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  ca_chrg_cart_rate: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  cb_chrg_cart_rate: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  cc_chrg_cart_rate: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  cd_chrg_cart_rate: number;

  @Column({ length: 3, nullable: true })
  quote_rev_num: string;

  @Column({ type: 'timestamp', nullable: true })
  modified_date: Date;

  @Column({ length: 1, nullable: true })
  type_price: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  matl_price: number;

  @Column({ type: 'bit', nullable: true })
  auto_prod_flag: boolean;

  @Column({ type: 'bit', nullable: true })
  item_cat_price_flag: boolean;

  @Column({ length: 20, nullable: true })
  auth_user_name: string;

  @Column({ length: 2, nullable: true })
  price_status: string;

  @Column({ type: 'numeric', precision: 12, scale: 0, nullable: true })
  unique_line_num: number;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  sampling_interval: number;

  @Column({ length: 5, nullable: true })
  sampling_interval_uom: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  sampling_qty_bal_forward: number;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  sampling_count_bal_forward: number;

  @Column({ type: 'numeric', precision: 3, scale: 0, nullable: true })
  max_age_of_concrete: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  writeoff_qty: number;

  @Column({ type: 'bit', nullable: true })
  writeoff_first_load_flag: boolean;

  @Column({ type: 'timestamp', nullable: true })
  update_date: Date;

  @Column({ length: 1, nullable: true })
  u_version: string;

  @Column({ type: 'varchar', nullable: true })
  ca_sur_codes: string;

  @Column({ type: 'varchar', nullable: true })
  cb_sur_codes: string;

  @Column({ type: 'varchar', nullable: true })
  cc_sur_codes: string;

  @Column({ type: 'varchar', nullable: true })
  cd_sur_codes: string;

  @Column({ type: 'varchar', nullable: true })
  ca_sur_rates: string;

  @Column({ type: 'varchar', nullable: true })
  cb_sur_rates: string;

  @Column({ type: 'varchar', nullable: true })
  cc_sur_rates: string;

  @Column({ type: 'varchar', nullable: true })
  cd_sur_rates: string;

  @Column({ type: 'varchar', nullable: true })
  ca_sundry_chrg_table_ids: string;

  @Column({ type: 'varchar', nullable: true })
  cb_sundry_chrg_table_ids: string;

  @Column({ type: 'varchar', nullable: true })
  cc_sundry_chrg_table_ids: string;

  @Column({ type: 'varchar', nullable: true })
  cd_sundry_chrg_table_ids: string;

  @Column({ type: 'varchar', nullable: true })
  ca_sundry_chrg_sep_invc_flags: string;

  @Column({ type: 'varchar', nullable: true })
  cb_sundry_chrg_sep_invc_flags: string;

  @Column({ type: 'varchar', nullable: true })
  cc_sundry_chrg_sep_invc_flags: string;

  @Column({ type: 'varchar', nullable: true })
  cd_sundry_chrg_sep_invc_flags: string;

  @ManyToOne(() => Proj, (project) => project.projectDetails, { onDelete: 'CASCADE' })
  project: Proj;
}
