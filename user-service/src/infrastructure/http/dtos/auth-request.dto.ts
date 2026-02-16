import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UserCredentials {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthRequest {
  @ApiProperty({
    type: UserCredentials,
    example: {
      email: 'john.doe@example.com',
      password: 'password123',
    },
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UserCredentials)
  user: UserCredentials;
}
