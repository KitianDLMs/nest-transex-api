import { Ordr } from 'src/ordr/entities/ordr.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';

@Entity('tick')
export class Tick {

  // -----------------------------
  // PRIMARY KEY (COMPOSITE)
  // -----------------------------
  @Column({ type: 'timestamp' })
  order_date: Date;

  @PrimaryColumn({ type: 'char', length: 12 })
  order_code: string;

  @PrimaryColumn({ type: 'char', length: 8 })
  tkt_code: string;

  // -----------------------------
  // FIRST BLOCK OF COLUMNS
  // -----------------------------

  @Column({ type: 'timestamp', nullable: true })
  tkt_date: Date | null;

  @Column({ type: 'boolean', nullable: true })
  apply_min_load_chrg_flag: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  apply_zone_chrg_flag: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  apply_excess_unld_chrg_flag: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  apply_season_chrg_flag: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  apply_min_haul_flag: boolean | null;

  @Column({ type: 'char', length: 12, nullable: true })
  driv_empl_code: string | null;

  @Column({ type: 'char', length: 8, nullable: true })
  hler_code: string | null;

  @Column({ type: 'char', length: 10, nullable: true })
  lot_block: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  min_load_chrg_table_id: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  excess_unld_chrg_table_id: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  season_chrg_table_id: string | null;

  @Column({ type: 'char', length: 24, nullable: true })
  po: string | null;

  @Column({ type: 'boolean', nullable: true })
  rm_print_mix_wgts_flag: boolean | null;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  rm_water_added_on_job: number | null;

  @Column({ type: 'char', length: 3, nullable: true })
  ship_plant_code: string | null;

  @Column({ type: 'char', length: 4, nullable: true })
  ship_plant_loc_code: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  scale_code: string | null;

  @Column({ type: 'char', length: 10, nullable: true })
  truck_code: string | null;

  @Column({ type: 'char', length: 2, nullable: true })
  truck_type: string | null;

  @Column({ type: 'char', length: 2, nullable: true })
  delv_meth_code: string | null;

  @Column({ type: 'char', length: 12, nullable: true })
  weigh_master_empl_code: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  remove_rsn_code: string | null;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  cod_amt: number | null;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  cod_order_amt: number | null;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  cod_prev_order_amt: number | null;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  cod_cash_recvd_amt: number | null;

  @Column({ type: 'char', length: 40, nullable: true })
  cod_cash_recvd_text: string | null;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  disc_amt: number | null;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  disc_tax_amt: number | null;

  @Column({ type: 'boolean', nullable: true })
  intfc_flag: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  invc_flag: boolean | null;

  @Column({ type: 'char', length: 12, nullable: true })
  invc_code: string | null;

  @Column({ type: 'timestamp', nullable: true })
  invc_date: Date | null;

  @Column({ type: 'numeric', precision: 6, scale: 0, nullable: true })
  invc_seq_num: number | null;

  @Column({ type: 'numeric', precision: 5, scale: 0, nullable: true })
  load_num: number | null;

  @Column({ type: 'char', length: 3, nullable: true })
  tax_code: string | null;

  @Column({ type: 'numeric', precision: 3, scale: 0, nullable: true })
  rm_mix_order_intrnl_line_num: number | null;

  @Column({ type: 'numeric', precision: 3, scale: 0, nullable: true })
  sched_num: number | null;

  @Column({ type: 'timestamp', nullable: true })
  sched_load_time: Date | null;

  @Column({ type: 'char', length: 3, nullable: true })
  susp_rsn_code: string | null;

  @Column({ type: 'char', length: 20, nullable: true })
  susp_user_name: string | null;

  @Column({ type: 'timestamp', nullable: true })
  susp_date_time: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  susp_cancel_date_time: Date | null;

  @Column({ type: 'char', length: 20, nullable: true })
  susp_cancel_user_name: string | null;

  @Column({ type: 'timestamp', nullable: true })
  typed_time: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  load_time: Date | null;
  // -----------------------------
  // SECOND BLOCK OF COLUMNS
  // -----------------------------

  @Column({ type: 'timestamp', nullable: true })
  leave_plant_time: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  arrive_job_time: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  start_pour_time: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  finish_pour_time: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  leave_job_time: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  return_plant_time: Date | null;

  @Column({ type: 'char', length: 2, nullable: true })
  stat_code: string | null;

  @Column({ type: 'char', length: 20, nullable: true })
  user_name: string | null;

  @Column({ type: 'timestamp', nullable: true })
  stat_date_time: Date | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  qty: number | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  qty_load: number | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  qty_sand: number | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  qty_stone: number | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  qty_cement: number | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  qty_water: number | null;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  amt: number | null;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  tax_amt: number | null;

  @Column({ type: 'numeric', precision: 6, scale: 0, nullable: true })
  ticket_seq_num: number | null;

  @Column({ type: 'char', length: 40, nullable: true })
  comments: string | null;

  @Column({ type: 'char', length: 30, nullable: true })
  pump_code: string | null;

  @Column({ type: 'boolean', nullable: true })
  pump_flag: boolean | null;

  @Column({ type: 'numeric', precision: 6, scale: 0, nullable: true })
  pump_time_min: number | null;

  @Column({ type: 'char', length: 3, nullable: true })
  zone_code: string | null;

  @Column({ type: 'numeric', precision: 5, scale: 0, nullable: true })
  delv_dist: number | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  fuel_surcharge_amt: number | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  energy_surcharge_amt: number | null;
  // -----------------------------
  // THIRD BLOCK OF COLUMNS (FINAL)
  // -----------------------------

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  truck_time_min: number | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  job_wait_time_min: number | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  plant_wait_time_min: number | null;

  @Column({ type: 'char', length: 3, nullable: true })
  min_haul_table_id: string | null;

  @Column({ type: 'numeric', precision: 5, scale: 0, nullable: true })
  haul_dist: number | null;

  @Column({ type: 'char', length: 3, nullable: true })
  haul_zone_code: string | null;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  haul_amt: number | null;

  @Column({ type: 'char', length: 3, nullable: true })
  rm_additive_code: string | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  rm_additive_qty: number | null;

  @Column({ type: 'boolean', nullable: true })
  rm_added_at_plant_flag: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  rm_added_at_job_flag: boolean | null;

  @Column({ type: 'numeric', precision: 17, scale: 2, nullable: true })
  rm_additive_amt: number | null;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  slump: number | null;

  @Column({ type: 'char', length: 10, nullable: true })
  batcher_code: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  route_code: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  ticket_type_code: string | null;

  @Column({ type: 'boolean', nullable: true })
  manual_flag: boolean | null;

  @Column({ type: 'char', length: 12, nullable: true })
  batch_code: string | null;

  @Column({ type: 'timestamp', nullable: true })
  batch_date: Date | null;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  batch_num: number | null;

  @Column({ type: 'char', length: 30, nullable: true })
  delv_contact_text: string | null;

  @Column({ type: 'char', length: 40, nullable: true })
  delv_phone_text: string | null;

  @Column({ type: 'numeric', precision: 5, scale: 0, nullable: true })
  zone_delv_dist: number | null;

  @Column({ type: 'timestamp', nullable: true })
  ticket_printed_date_time: Date | null;

  @Column({ type: 'char', length: 255, nullable: true })
  ticket_printed_user_name: string | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  add_water_qty: number | null;

  @Column({ type: 'boolean', nullable: true })
  add_water_flag: boolean | null;

  @Column({ type: 'char', length: 40, nullable: true })
  add_water_user_name: string | null;

  @Column({ type: 'timestamp', nullable: true })
  add_water_date_time: Date | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  add_water_mixer_rev: number | null;

  @Column({ type: 'boolean', nullable: true })
  void_flag: boolean | null;

  @Column({ type: 'char', length: 20, nullable: true })
  void_user_name: string | null;

  @Column({ type: 'timestamp', nullable: true })
  void_date_time: Date | null;

  @Column({ type: 'char', length: 255, nullable: true })
  void_comments: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  unload_code: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  load_size_code: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  addtl_code: string | null;

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  addtl_qty: number | null;

  @Column({ type: 'boolean', nullable: true })
  ready_flag: boolean | null;

  @Column({ type: 'char', length: 24, nullable: true })
  gps_latitude: string | null;

  @Column({ type: 'char', length: 24, nullable: true })
  gps_longitude: string | null;

  @Column({ type: 'timestamp', nullable: true })
  gps_date_time: Date | null;

  @Column({ type: 'char', length: 10, nullable: true })
  project_code: string | null;

  @Column({ type: 'char', length: 10, nullable: true })
  operator_code: string | null;

  @Column({ type: 'boolean', nullable: true })
  flagged_for_review_flag: boolean | null;

  @ManyToOne(() => Ordr, (order) => order.tickets, { onDelete: 'CASCADE' })
  order: Ordr;

}
