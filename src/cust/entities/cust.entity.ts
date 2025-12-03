import { User } from 'src/auth/entities/user.entity';
import { Ordr } from 'src/ordr/entities/ordr.entity';
import { Proj } from 'src/proj/entities/proj.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('cust')
export class Cust {

  @PrimaryColumn()
  cust_code: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  sort_name?: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  addr_line_1?: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  addr_line_2?: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  addr_city?: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  addr_state?: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  addr_cntry?: string;  // cuidado con valores >3 caracteres

  @Column({ type: 'varchar', length: 10, nullable: true })
  addr_postcd?: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  contct_name?: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  phone_num_1?: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  phone_num_2?: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  phone_num_3?: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  phone_num_4?: string;

  @Column({ type: 'timestamp', nullable: true })
  setup_date?: Date;

  @OneToMany(() => Proj, proj => proj.customer)
  projs: Proj[];

  @OneToMany(() => Ordr, ordr => ordr.customer)
  orders: Ordr[];

  @OneToMany(() => User, (user) => user.cust)
  users?: User[];
}
