import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Tick } from './tick.entity';

@Entity({ name: 'tick_doc' })
export class TickDoc {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'filename' })
  fileName: string;

  @Column({ name: 'filepath' })
  filePath: string;

  @ManyToOne(() => Tick, tick => tick.docs, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'order_code', referencedColumnName: 'order_code' },
    { name: 'tkt_code', referencedColumnName: 'tkt_code' }
  ])
  tick: Tick;
}
