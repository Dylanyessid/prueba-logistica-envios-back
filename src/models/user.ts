import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import type { IUser } from "../interfaces/user.interface.js";

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 20 })
  role!: string;

  @Column({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;
  
  @Column({ type: 'timestamptz', name: 'updated_at' })
  updatedAt!: Date;

}
