import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';
import { GetUserDto } from './get-user.dto';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: GetUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findById(dto.userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
}
