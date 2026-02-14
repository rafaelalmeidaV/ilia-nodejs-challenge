import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../../../core/use-cases/create-user/create-user.use-case';
import { GetUserUseCase } from '../../../core/use-cases/get-user/get-user.use-case';
import { ListUsersUseCase } from '../../../core/use-cases/list-users/list-users.use-case';
import { UpdateUserUseCase } from '../../../core/use-cases/update-user/update-user.use-case';
import { DeleteUserUseCase } from '../../../core/use-cases/delete-user/delete-user.use-case';
import { UserEntity } from '../../../core/domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async createUser(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    return await this.createUserUseCase.execute({
      first_name,
      last_name,
      email,
      password,
    });
  }

  async getUser(userId: string): Promise<UserEntity> {
    return await this.getUserUseCase.execute({ userId });
  }

  async listUsers(): Promise<UserEntity[]> {
    return await this.listUsersUseCase.execute();
  }

  async updateUser(
    userId: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string,
  ): Promise<UserEntity> {
    return await this.updateUserUseCase.execute({
      userId,
      first_name,
      last_name,
      email,
      password,
    });
  }

  async deleteUser(userId: string): Promise<void> {
    return await this.deleteUserUseCase.execute({ userId });
  }
}
