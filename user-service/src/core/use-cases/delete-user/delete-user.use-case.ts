import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';
import { DeleteUserDto } from './delete-user.dto';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: DeleteUserDto): Promise<void> {
    const deleted = await this.userRepository.delete(dto.userId);

    if (!deleted) {
      throw new NotFoundException('user not found');
    }
  }
}
