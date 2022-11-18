import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from '@helpers/messages.helper';
import { RegExHelper } from '@helpers/regex.helpers';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;
}
