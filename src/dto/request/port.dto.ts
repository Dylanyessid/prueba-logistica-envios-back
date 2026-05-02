import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePortDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(150)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  country!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  city!: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(["national", "international"])
  type!: string;
}

export class UpdatePortDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(150)
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  country?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  city?: string;

  @IsString()
  @IsOptional()
  @IsIn(["national", "international"])
  type?: string;
}
