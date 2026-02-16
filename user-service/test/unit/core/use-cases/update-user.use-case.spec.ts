import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserUseCase } from '../../../../src/core/use-cases/update-user/update-user.use-case';
import { USER_REPOSITORY } from '../../../../src/core/domain/repositories/user.repository.interface';
import { UserEntity } from '../../../../src/core/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;
  let mockRepository: { update: jest.Mock };

  beforeEach(async () => {
    mockRepository = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
  });

  it('should update user successfully', async () => {
    const dto = {
      userId: '1',
      first_name: 'John Updated',
      last_name: 'Doe Updated',
    };

    const updatedUser = new UserEntity({
      id: '1',
      first_name: 'John Updated',
      last_name: 'Doe Updated',
      email: 'john@example.com',
      password: 'hashed',
    });

    mockRepository.update.mockResolvedValue(updatedUser);

    const result = await useCase.execute(dto);

    expect(mockRepository.update).toHaveBeenCalledWith('1', {
      first_name: dto.first_name,
      last_name: dto.last_name,
    });
    expect(result).toEqual(updatedUser);
  });

  it('should hash password when updating', async () => {
    const dto = {
      userId: '1',
      password: 'newpassword123',
    };

    const hashedPassword = 'new_hashed_password';
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    const updatedUser = new UserEntity({
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: hashedPassword,
    });

    mockRepository.update.mockResolvedValue(updatedUser);

    await useCase.execute(dto);

    expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
    expect(mockRepository.update).toHaveBeenCalledWith('1', {
      password: hashedPassword,
    });
  });

  it('should throw NotFoundException when user not found', async () => {
    const dto = {
      userId: '1',
      first_name: 'John',
    };

    mockRepository.update.mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(NotFoundException);
    await expect(useCase.execute(dto)).rejects.toThrow('user not found');
  });
});
