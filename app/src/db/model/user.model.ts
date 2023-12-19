import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';

@Entity('user')
export class UserDbModel {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    name: 'chat_id',
    type: 'int8',
    nullable: false,
    unique: false,
  })
  chatId: number;

  @Column({
    name: 'user_id',
    type: 'int8',
    nullable: false,
    unique: false,
  })
  userId: number;

  @Column({
    name: 'first_name',
    type: 'text',
    nullable: false,
    unique: false,
  })
  firstName: string;

  @Column({
    name: 'is_admin',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isAdmin: boolean;
}