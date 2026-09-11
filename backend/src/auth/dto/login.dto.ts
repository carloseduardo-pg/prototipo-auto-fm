import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/** Body de POST /auth/login. */
export class LoginDto {
  @ApiProperty({ example: 'operador@fm.local' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'fm123456', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;
}
