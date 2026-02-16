import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }
}
