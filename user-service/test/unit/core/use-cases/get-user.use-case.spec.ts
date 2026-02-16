import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetUserUseCase } from '../../../../src/core/use-cases/get-user/get-user.use-case';
import { USER_REPOSITORY } from '../../../../src/core/domain/repositories/user.repository.interface';
import { UserEntity } from '../../../../src/core/domain/entities/user.entity';

describe('GetUserUseCase', () => {
  let useCase: GetUserUseCase;
  let mockRepository: { findById: jest.Mock };

  beforeEach(async () => {
    mockRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetUserUseCase>(GetUserUseCase);
  });

  it('should return user when found', async () => {
    const userId = '507f1f77bcf86cd799439011';
    const expectedUser = new UserEntity({
      id: userId,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password',
    });

    mockRepository.findById.mockResolvedValue(expectedUser);

    const result = await useCase.execute({ userId });

    expect(mockRepository.findById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expectedUser);
  });

  it('should throw NotFoundException when user not found', async () => {
    const userId = '507f1f77bcf86cd799439011';

    mockRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute({ userId })).rejects.toThrow(
      NotFoundException,
    );
    await expect(useCase.execute({ userId })).rejects.toThrow('user not found');
  });
});
