import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateStudentDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @Length(6, 20)
  ra!: string;

  @IsNotEmpty()
  @Length(11, 11)
  cpf!: string;
}
