import { IsAlphanumeric, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Matches } from "class-validator";

export class CreateLandShipmentDto {
  @IsInt()
  @IsPositive()
  clientId!: number;

  @IsInt()
  @IsPositive()
  productId!: number;

  @IsInt()
  @IsPositive()
  destinationWarehouseId!: number;

  @IsInt()
  @IsPositive()
  productQuantity!: number;

  @IsNumber()
  @IsPositive()
  shippingPrice!: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}[0-9]{3}$/, {
    message: "vehiclePlate must have the format AAA123",
  })
  vehiclePlate!: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @Matches(/^[A-Za-z0-9]{10}$/, {
    message: "trackingNumber must have exactly 10 alphanumeric characters",
  })
  trackingNumber!: string;

  @IsDateString()
  registrationDate!: string;

  @IsDateString()
  deliveryDate!: string;
}

export class UpdateLandShipmentDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  clientId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  productId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  destinationWarehouseId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  productQuantity?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  shippingPrice?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}[0-9]{3}$/, {
    message: "vehiclePlate must have the format AAA123",
  })
  vehiclePlate?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @Matches(/^[A-Za-z0-9]{10}$/, {
    message: "trackingNumber must have exactly 10 alphanumeric characters",
  })
  trackingNumber?: string;

  @IsOptional()
  @IsDateString()
  registrationDate?: string;

  @IsOptional()
  @IsDateString()
  deliveryDate?: string;
}
