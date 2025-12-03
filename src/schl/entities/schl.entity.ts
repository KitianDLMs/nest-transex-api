import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

@Entity('SCHL')
export class Schl {

  // ----------------------------------
  // PRIMARY KEY (5-column composite)
  // ----------------------------------
  
  @Column({ type: 'timestamp' })
  order_date: Date;

  @PrimaryColumn({ type: 'char', length: 12 })
  order_code: string;

  @PrimaryColumn({ type: 'numeric', precision: 3, scale: 0 })
  order_intrnl_line_num: number;

  @PrimaryColumn({ type: 'numeric', precision: 3, scale: 0 })
  sched_num: number;

  @PrimaryColumn({ type: 'numeric', precision: 12, scale: 0 })
  unique_num: number;

  // ----------------------------------
  // OTHER COLUMNS
  // ----------------------------------

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  load_num: number | null;

  @Column({ type: 'char', length: 8, nullable: true })
  tkt_code: string | null;

  @Column({ type: 'char', length: 10, nullable: true })
  truck_code: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  from_plant_code: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  to_plant_code: string | null;

  @Column({ type: 'numeric', precision: 8, scale: 2, nullable: true })
  load_size: number | null;

  @Column({ type: 'boolean', nullable: true })
  fixed_time_flag: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  fixed_qty_flag: boolean | null;

  @Column({ type: 'char', length: 3, nullable: true })
  remove_rsn_code: string | null;

  @Column({ type: 'timestamp', nullable: true })
  on_job_time: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  orig_on_job_time: Date | null;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  to_job_trvl_time: number | null;

  @Column({ type: 'char', length: 1, nullable: true })
  fixed_to_job_trvl_time_code: string | null;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  to_plant_trvl_time: number | null;

  @Column({ type: 'char', length: 1, nullable: true })
  fixed_to_plant_trvl_time_code: string | null;

  @Column({ type: 'numeric', precision: 7, scale: 2, nullable: true })
  unld_time: number | null;

  @Column({ type: 'char', length: 1, nullable: true })
  fixed_unld_time_code: string | null;

  @Column({ type: 'boolean', nullable: true })
  orig_on_job_time_agree_flag: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  cleanup_flag: boolean | null;

  @Column({ type: 'numeric', precision: 7, scale: 2, nullable: true })
  truck_spacing_mins: number | null;

  @Column({ type: 'boolean', nullable: true })
  fixed_spacing_flag: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  fixed_to_plant_flag: boolean | null;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  travel_time: number | null;

  @Column({ type: 'numeric', precision: 5, scale: 0, nullable: true })
  unload_time: number | null;

  @Column({ type: 'timestamp', nullable: true })
  travel_time_update: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  unload_time_update: Date | null;

  @Column({ type: 'char', length: 10, nullable: true })
  assign_truck_code: string | null;

  @Column({ type: 'char', length: 36, nullable: true })
  guid: string | null;

  @Column({ type: 'timestamp', nullable: true })
  pump_end_pouring_time: Date | null;

  @Column({ type: 'boolean', nullable: true })
  from_pump_schedule_flag: boolean | null;

  @Column({ type: 'timestamp', nullable: true })
  on_job_time_design_value: Date | null;

  @Column({ type: 'numeric', precision: 7, scale: 2, nullable: true })
  unld_time_design_value: number | null;

  @Column({ type: 'numeric', precision: 7, scale: 2, nullable: true })
  truck_spacing_min_design_value: number | null;

  @Column({ type: 'numeric', precision: 5, scale: 0, nullable: true })
  pump_truck_setup_time: number | null;

  @Column({ type: 'numeric', precision: 5, scale: 0, nullable: true })
  pump_truck_uninstall_time: number | null;

  @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
  job_washdown_time: number | null;

  @Column({ type: 'char', length: 6, nullable: true })
  journey_code: string | null;

  @Column({ type: 'numeric', precision: 3, scale: 0, nullable: true })
  journey_seq_code: number | null;

  @Column({ type: 'timestamp', nullable: true })
  journey_date: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  update_date: Date | null;

  @Column({ type: 'char', length: 1, nullable: true })
  u_version: string | null;

}
