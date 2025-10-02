import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Obra } from './obra.entity';

@Entity({ name: 'obra_images' })
export class ObraImage {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(
    () => Obra,
    (obra) => obra.images,
    { onDelete: 'CASCADE' }
  )
  obra: Obra;

}
