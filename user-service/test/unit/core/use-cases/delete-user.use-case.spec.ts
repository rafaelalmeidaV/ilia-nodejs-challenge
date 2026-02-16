import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DeleteUserUseCase } from '../../../../src/core/use-cases/delete-user/delete-user.use-case';
import { USER_REPOSITORY } from '../../../../src/core/domain/repositories/user.repository.interface';

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;
  let mockRepository: { delete: jest.Mock };

  beforeEach(async () => {
    mockRepository = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
  });

  it('should delete user successfully', async () => {
    const userId = '507f1f77bcf86cd799439011';

    mockRepository.delete.mockResolvedValue(true);

    await useCase.execute({ userId });

    expect(mockRepository.delete).toHaveBeenCalledWith(userId);
  });

  it('should throw NotFoundException when user not found', async () => {
    const userId = '507f1f77bcf86cd799439011';

    mockRepository.delete.mockResolvedValue(false);

    await expect(useCase.execute({ userId })).rejects.toThrow(
      NotFoundException,
    );
    await expect(useCase.execute({ userId })).rejects.toThrow('user not found');
  });
});
