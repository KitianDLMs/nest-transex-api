import { User } from 'src/auth/entities/user.entity';
import { Cust } from 'src/cust/entities/cust.entity';
import { Ordl } from 'src/ordl/entities/ordl.entity';
import { Tick } from 'src/tick/entities/tick.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('ordr')
export class Ordr {  

  @PrimaryColumn({ type: 'timestamp' })
  order_date: Date;

  @PrimaryColumn({ type: 'text' })
  order_code: string;

  @Column({ type: 'text', nullable: true })
  order_type?: string;

  @Column({ type: 'bit', nullable: true })
  apply_min_load_chrg_flag?: boolean;

  @Column({ type: 'text', nullable: true })
  prod_line_code?: string;

  @Column({ type: 'text', nullable: true })
  stat?: string;

  @Column({
    transformer: {
      to: (value: string) => value?.trim(),
      from: (value: string) => value?.trim(),
    },
  })
  cust_code: string;

  @ManyToOne(() => Cust, cust => cust.orders, { nullable: true })
  @JoinColumn({ name: 'cust_code' })
  customer: Cust;

  @Column({ type: 'text', nullable: true })
  ship_cust_code?: string;

  @Column({ type: 'text', nullable: true })
  ref_cust_code?: string;

  @Column({ type: 'text', nullable: true })
  cust_name?: string;

  @Column({ type: 'text', nullable: true })
  cust_sort_name?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  proj_code?: string;

  @Column({ type: 'text', nullable: true })
  zone_code?: string;

  @Column({ type: 'text', nullable: true })
  lot_block?: string;

  @Column({ type: 'text', nullable: true })
  cust_job_num?: string;

  @Column({ type: 'text', nullable: true })
  po?: string;

  @Column({ type: 'text', nullable: true })
  taken_by_empl_code?: string;

  @Column({ type: 'numeric', precision: 3, scale: 0, nullable: true })
  taken_on_phone_line_num?: number;

  @Column({ type: 'text', nullable: true })
  order_by_name?: string;

  @Column({ type: 'text', nullable: true })
  order_by_phone_num?: string;

  // --- TODOS LOS FLAGS COMO BOOLEAN ---
  @Column({ type: 'bit', nullable: true })
  apply_zone_chrg_flag?: boolean;

  @Column({ type: 'bit', nullable: true })
  apply_excess_unld_chrg_flag?: boolean;

  @Column({ type: 'bit', nullable: true })
  apply_season_chrg_flag?: boolean;

  @Column({ type: 'bit', nullable: true })
  apply_min_haul_pay_flag?: boolean;

  @Column({ type: 'bit', nullable: true })
  rm_print_mix_wgts_flag?: boolean;

  @Column({ type: 'bit', nullable: true })
  min_load_sep_invc_flag?: boolean;

  @Column({ type: 'bit', nullable: true })
  excess_unld_sep_invc_flag?: boolean;

  @Column({ type: 'bit', nullable: true })
  season_sep_invc_flag?: boolean;

  @Column({ type: 'bit', nullable: true })
  apply_pump_unld_chrg_flag?: boolean;

  @Column({ type: 'bit', nullable: true })
  apply_pump_sundry_chrg_flags?: boolean;

  @Column({ type: 'bit', nullable: true })
  apply_cart_rate_hler_flag?: boolean;

  @Column({ type: 'bit', nullable: true })
  apply_min_haul_flag?: boolean;

  // --- FIN DE FLAGS ---

  @Column({ type: 'text', nullable: true })
  price_plant_code?: string;

  @Column({ type: 'text', nullable: true })
  price_plant_loc_code?: string;

  @Column({ type: 'text', nullable: true })
  comp_code?: string;

  @Column({ type: 'text', nullable: true })
  hler_code?: string;

  @Column({ type: 'text', nullable: true })
  min_load_chrg_table_id?: string;

  @Column({ type: 'text', nullable: true })
  excess_unld_chrg_table_id?: string;

  @Column({ type: 'text', nullable: true })
  season_chrg_table_id?: string;

  @Column({ type: 'text', nullable: true })
  sales_anl_code?: string;

  @Column({ type: 'text', nullable: true })
  slsmn_empl_code?: string;

  @Column({ type: 'numeric', precision: 1, scale: 0, nullable: true })
  taxble_code?: number;

  @Column({ type: 'text', nullable: true })
  tax_code?: string;

  @Column({ type: 'text', nullable: true })
  non_tax_rsn_code?: string;

  @Column({ type: 'text', nullable: true })
  susp_rsn_code?: string;

  @Column({ type: 'text', nullable: true })
  susp_user_name?: string;

  @Column({ type: 'timestamp', nullable: true })
  susp_date_time?: Date;

  @Column({ type: 'timestamp', nullable: true })
  susp_cancel_date_time?: Date;

  @Column({ type: 'text', nullable: true })
  susp_cancel_user_name?: string;

  @Column({ type: 'text', nullable: true })
  remove_rsn_code?: string;

  @Column({ type: 'text', nullable: true })
  memo_rsn_code?: string;

  @Column({ type: 'text', nullable: true })
  pkt_num?: string;

  @Column({ type: 'numeric', precision: 2, scale: 0, nullable: true })
  track_order_color?: number;

  @Column({ type: 'numeric', precision: 3, scale: 0, nullable: true })
  intrnl_line_num?: number;

  @Column({ type: 'numeric', precision: 5, scale: 0, nullable: true })
  curr_load_num?: number;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  cod_order_amt?: number;

  @Column({ type: 'text', nullable: true })
  invc_code?: string;

  @Column({ type: 'timestamp', nullable: true })
  setup_date?: Date;

  @Column({ type: 'text', nullable: true })
  quote_code?: string;

  @Column({ type: 'varchar', nullable: true })
  delv_addr?: string;

  @Column({ type: 'varchar', nullable: true })
  instr?: string;

  @Column({ type: 'varchar', nullable: true })
  user_defined?: string;

  @Column({ type: 'varchar', nullable: true })
  sur_codes?: string;

  @Column({ type: 'varchar', nullable: true })
  sur_rate_amts?: string;

  @Column({ type: 'varchar', nullable: true })
  apply_sur_rate_hler_flags?: string;

  @Column({ type: 'varchar', nullable: true })
  sundry_chrg_table_ids?: string;

  @Column({ type: 'varchar', nullable: true })
  apply_sundry_chrg_flags?: string;

  @Column({ type: 'varchar', nullable: true })
  sundry_chrg_sep_invc_flags?: string;

  @Column({ type: 'varchar', nullable: true })
  sundry_chrg_comb_meth_code?: string;

  @Column({ type: 'varchar', nullable: true })
  sundry_chrg_override_rates?: string;

  @Column({ type: 'varchar', nullable: true })
  order_msgs?: string;

  @Column({ type: 'varchar', nullable: true })
  pump_unld_chrg_table_id?: string;

  @Column({ type: 'varchar', nullable: true })
  pump_sundry_chrg_table_ids?: string;

  @Column({ type: 'varchar', nullable: true })
  pump_sundry_chrg_over_rates?: string;

  @OneToMany(() => Ordl, ordl => ordl.order)
  orderDetails: Ordl[];

  @OneToMany(() => Tick, tick => tick.order)
  ticks: Tick[];

  @ManyToOne(() => User, (user) => user.ordrs, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
