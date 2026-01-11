// import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { User } from 'src/auth/entities/user.entity';
// import { Proj } from 'src/proj/entities/proj.entity';

// @Entity('user_proj')
// export class UserProj {
  
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => User, user => user.assignedProjects, { onDelete: 'CASCADE' })
//   user: User;

//   @ManyToOne(() => Proj, proj => proj.assignedUsers, { eager: true, onDelete: 'CASCADE' })
//   project: Proj;

// }
