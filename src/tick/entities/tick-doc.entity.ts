import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tick } from './tick.entity';

@Entity({ name: 'tick_doc' })
export class TickDoc {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column()
  filePath: string;

//   @ManyToOne(() => Tick, tick => tick.docs, { onDelete: 'CASCADE' })
//   tick: Tick;
}
