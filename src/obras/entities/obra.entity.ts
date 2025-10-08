import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { ObraImage } from './obra-image.entity';

@Entity('obras')
export class Obra {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  location: string;

  @Column('float')
  budget: number;

  @Column('date')
  startDate: string;

  @Column('date')
  endDate: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  estado?: string;

  @Column({ nullable: true })
  responsable?: string;

  @Column({ type: 'int', default: 0 })
  progreso?: number;

  @OneToMany(
    () => ObraImage,
    (obraImage) => obraImage.obra,
    { cascade: true, eager: true }
  )
  images: ObraImage[];

  @ManyToOne(
    () => User,
    (user) => user.obras   // 👈 DEBE coincidir con User.obras
  )
  user: User;
}
