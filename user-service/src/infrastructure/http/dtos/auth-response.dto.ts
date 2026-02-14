import { ApiProperty } from '@nestjs/swagger';

class UserData {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ example: 'John' })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;
}

export class AuthResponse {
  @ApiProperty({ type: UserData })
  user: UserData;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;
}
