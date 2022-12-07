import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: false,
    name: 'username',
    default: '',
  })
  username: string;

  @Column({
    nullable: false,
    name: 'email',
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    name: 'password',
    default: '',
  })
  password: string;
}
