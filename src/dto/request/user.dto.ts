import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export class CreateClientUserDto {

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsNotEmpty()
  phone!: string | null;

  @IsNotEmpty()
  document!: string;

  @IsNotEmpty()
  address!: string | null;

}



export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  
  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class UpdateClientUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  phone?: string | null;

  @IsOptional()
  document?: string;

  @IsOptional()
  address?: string | null;
}
