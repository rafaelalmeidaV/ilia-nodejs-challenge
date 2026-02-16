import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../dtos/auth-request.dto';
import { AuthResponse } from '../dtos/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({
    status: 200,
    description: 'Authentication successful',
    type: AuthResponse,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async authenticate(@Body() request: AuthRequest): Promise<AuthResponse> {
    const result = await this.authService.authenticate(
      request.user.email,
      request.user.password,
    );

    return result;
  }
}
