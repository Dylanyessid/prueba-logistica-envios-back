import { IsEmail, IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateUserDto {

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


}

