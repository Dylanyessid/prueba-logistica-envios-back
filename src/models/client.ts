import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { IClient } from "../interfaces/client.interface.js";

@Entity('clients')
export class Client implements IClient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', unique: true, name: 'user_id' })
  userId!: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone!: string | null;
 
  @Column({ type: 'varchar', length: 20, unique: true })
  document!: string;
 
  @Column({ type: 'varchar', length: 255, nullable: true })
  address!: string | null;
 
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt!: Date | null;
}
