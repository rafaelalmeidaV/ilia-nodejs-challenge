import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';
import { UpdateUserDto } from './update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: UpdateUserDto): Promise<UserEntity> {
    const updateData: Partial<UserEntity> = {};

    if (dto.first_name) updateData.first_name = dto.first_name;
    if (dto.last_name) updateData.last_name = dto.last_name;
    if (dto.email) updateData.email = dto.email;
    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    const user = await this.userRepository.update(dto.userId, updateData);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
}
