import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('imst')
export class Imst {
  @PrimaryColumn({ type: 'char', length: 12 })
  item_code: string;

  @Column({ type: 'char', length: 40, nullable: true })
  descr?: string;

  @Column({ type: 'char', length: 16, nullable: true })
  short_descr?: string;

  @Column({ type: 'boolean', nullable: true })
  invy_flag?: boolean;

  @Column({ type: 'numeric', precision: 1, scale: 0, nullable: true })
  taxble_code?: number;

  @Column({ type: 'numeric', precision: 1, scale: 0, nullable: true })
  tax_rate_code?: number;

  @Column({ type: 'char', length: 4, nullable: true })
  usage_code?: string;

  @Column({ type: 'char', length: 3, nullable: true })
  non_tax_rsn_code?: string;

  @Column({ type: 'char', length: 6, nullable: true })
  item_cat?: string;

  @Column({ type: 'char', length: 1, nullable: true })
  matl_type?: string;

  @Column({ type: 'char', length: 12, nullable: true })
  invy_item_code?: string;

  @Column({ type: 'boolean', nullable: true })
  print_on_tkt_flag?: boolean;

  @Column({ type: 'boolean', nullable: true })
  print_qty_on_tkt_flag?: boolean;

  @Column({ type: 'char', length: 5, nullable: true })
  order_uom?: string;

  @Column({ type: 'char', length: 5, nullable: true })
  price_uom?: string;

  @Column({ type: 'char', length: 5, nullable: true })
  invy_uom?: string;

  @Column({ type: 'char', length: 5, nullable: true })
  purch_uom?: string;

  @Column({ type: 'char', length: 5, nullable: true })
  batch_uom?: string;

  @Column({ type: 'char', length: 5, nullable: true })
  rpt_uom?: string;

  @Column({ type: 'boolean', nullable: true })
  price_admix_flag?: boolean;

  @Column({ type: 'char', length: 8, nullable: true })
  agg_size?: string;

  @Column({ type: 'char', length: 8, nullable: true })
  cem_type?: string;

  @Column({ type: 'numeric', precision: 3, scale: 0, nullable: true })
  days_to_strgth?: number;

  @Column({ type: 'numeric', precision: 8, scale: 2, nullable: true })
  max_water?: number;

  @Column({ type: 'numeric', precision: 6, scale: 2, nullable: true })
  water_cem_ratio?: number;

  @Column({ type: 'numeric', precision: 7, scale: 3, nullable: true })
  pct_air?: number;

  @Column({ type: 'char', length: 8, nullable: true })
  slump?: string;

  @Column({ type: 'char', length: 5, nullable: true })
  slump_uom?: string;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  strgth?: number;

  @Column({ type: 'char', length: 5, nullable: true })
  strgth_uom?: string;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  water_hold?: number;

  @Column({ type: 'boolean', nullable: true })
  terms_disc_flag?: boolean;

  @Column({ type: 'boolean', nullable: true })
  trade_disc_flag?: boolean;

  @Column({ type: 'timestamp', nullable: true })
  expir_date?: Date;

  @Column({ type: 'boolean', nullable: true })
  serial_num_flag?: boolean;

  @Column({ type: 'boolean', nullable: true })
  lot_num_flag?: boolean;

  @Column({ type: 'boolean', nullable: true })
  resale_flag?: boolean;

  @Column({ type: 'boolean', nullable: true })
  const_flag?: boolean;

  @Column({ type: 'char', length: 10, nullable: true })
  cust_code?: string;

  @Column({ type: 'char', length: 12, nullable: true })
  proj_code?: string;

  @Column({ type: 'numeric', precision: 7, scale: 2, nullable: true })
  min_temp?: number;

  @Column({ type: 'char', length: 5, nullable: true })
  min_temp_uom?: string;

  @Column({ type: 'numeric', precision: 7, scale: 3, nullable: true })
  pct_recycle?: number;

  @Column({ type: 'char', length: 1, nullable: true })
  order_qty_ext_code?: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  order_dosage_qty?: number;

  @Column({ type: 'char', length: 5, nullable: true })
  order_dosage_qty_uom?: string;

  @Column({ type: 'char', length: 1, nullable: true })
  price_qty_ext_code?: string;

  @Column({ type: 'char', length: 1, nullable: true })
  tkt_qty_ext_code?: string;

  @Column({ type: 'varchar', nullable: true })
  user_defined?: string;

  @Column({ type: 'timestamp', nullable: true })
  update_date?: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  u_version?: string;

  // @Column({ type: 'char', length: 20, nullable: true })
  // mix_type?: string;

  // @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  // matl_price?: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ type: 'char', length: 8, nullable: true })
  rm_slump?: string;
}
