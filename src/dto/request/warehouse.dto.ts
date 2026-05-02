import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateWarehouseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(150)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  address!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  country!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  city!: string;

  @IsInt()
  @IsPositive()
  capacity!: number;
}

export class UpdateWarehouseDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(150)
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(255)
  address?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  country?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  city?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  capacity?: number;
}
