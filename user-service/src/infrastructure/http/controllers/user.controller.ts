import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserService } from '../services/user.service';
import { CreateUserRequest } from '../dtos/create-user-request.dto';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UserResponse } from '../dtos/user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 200,
    description: 'User created successfully',
    type: UserResponse,
  })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async createUser(@Body() request: CreateUserRequest): Promise<UserResponse> {
    const user = await this.userService.createUser(
      request.first_name,
      request.last_name,
      request.email,
      request.password,
    );

    return {
      id: user.id!,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: [UserResponse],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listUsers(): Promise<UserResponse[]> {
    const users = await this.userService.listUsers();

    return users.map((user) => ({
      id: user.id!,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: UserResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUser(@Param('id') id: string): Promise<UserResponse> {
    const user = await this.userService.getUser(id);

    return {
      id: user.id!,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUser(
    @Param('id') id: string,
    @Body() request: UpdateUserRequest,
  ): Promise<UserResponse> {
    const user = await this.userService.updateUser(
      id,
      request.first_name,
      request.last_name,
      request.email,
      request.password,
    );

    return {
      id: user.id!,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
