import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Obra } from 'src/obras/entities/obra.entity';
import { Proj } from 'src/proj/entities/proj.entity';
import { Ordr } from 'src/ordr/entities/ordr.entity';
import { Cust } from 'src/cust/entities/cust.entity';

@Entity('users')
export class User {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user']
  })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Obra, (obra) => obra.user)
  obras: Obra[];

  @OneToMany(() => Proj, proj => proj.user)
  projs: Proj[];

  @OneToMany(() => Ordr, ordr => ordr.user)
  ordrs: Ordr[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  cust_code: string;

  @ManyToOne(() => Cust, cust => cust.users, { eager: true })
  cust: Cust;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();   
  }
}
