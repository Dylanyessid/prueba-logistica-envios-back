import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { ISeaShipment } from "../interfaces/sea-shipment.interface.js";

@Entity('sea_shipments')
export class SeaShipment implements ISeaShipment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'integer', nullable: false, name: 'client_id'})
  clientId!: number;

  @Column({type: 'integer', nullable: false, name:'product_id'})
  productId!: number;

  @Column({type: 'integer', nullable: false, name: 'destination_port_id'})
  destinationPortId!: number;

  @Column({type: 'integer', nullable: false, name: 'product_quantity'})
  productQuantity!: number;

  @Column({type:'numeric', nullable: false, name: 'shipping_price'})
  shippingPrice!: number;

  @Column({type:'numeric', nullable: false, name: 'discount_percentage'})
  discountPercentage!: number;

  @Column({type:'numeric', nullable: false, name: 'discount_amount'})
  discountAmount!: number;

  @Column({type:'numeric', nullable: false, name: 'final_price'})
  finalPrice!: number;

  @Column({type: 'varchar', nullable: false, name: 'fleet_number'})
  fleetNumber!: string;

  @Column({type: 'varchar', nullable: false, name: 'tracking_number'})
  trackingNumber!: string;

  @Column({type:'date', nullable:false, name: 'registration_date'})
  registrationDate!: Date;

  @Column({type:'date', nullable:false, name: 'delivery_date'})
  deliveryDate!: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt!: Date | null;
}
