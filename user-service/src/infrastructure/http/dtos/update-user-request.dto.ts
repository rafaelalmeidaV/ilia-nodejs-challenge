import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserRequest {
  @ApiProperty({ example: 'John', required: false })
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'password123', minLength: 6, required: false })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;
}
