import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ example: 'John' })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;
}
