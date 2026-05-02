import { IsAlphanumeric, IsDateString, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Matches } from "class-validator";

export class CreateSeaShipmentDto {
  @IsInt()
  @IsPositive()
  clientId!: number;

  @IsInt()
  @IsPositive()
  productId!: number;

  @IsInt()
  @IsPositive()
  destinationPortId!: number;

  @IsInt()
  @IsPositive()
  productQuantity!: number;

  @IsNumber()
  @IsPositive()
  shippingPrice!: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}[0-9]{4}[A-Z]$/, {
    message: "fleetNumber must have the format AAA1234A",
  })
  fleetNumber!: string;

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
