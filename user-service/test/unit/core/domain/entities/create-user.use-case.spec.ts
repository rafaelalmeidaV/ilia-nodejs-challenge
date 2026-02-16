import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../../src/core/use-cases/create-user/create-user.use-case';
import { USER_REPOSITORY } from '../../../../../src/core/domain/repositories/user.repository.interface';
import { UserEntity } from '../../../../../src/core/domain/entities/user.entity';
import { UserStatus } from '../../../../../src/core/domain/enums/user-status.enum';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockRepository: { findByEmail: jest.Mock; create: jest.Mock };

  beforeEach(async () => {
    mockRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should create a user successfully', async () => {
    const dto = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const hashedPassword = 'hashed_password';
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    mockRepository.findByEmail.mockResolvedValue(null);

    const expectedUser = new UserEntity({
      id: '1',
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      password: hashedPassword,
      status: UserStatus.ACTIVE,
    });

    mockRepository.create.mockResolvedValue(expectedUser);

    const result = await useCase.execute(dto);

    expect(mockRepository.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        password: hashedPassword,
      }),
    );
    expect(result).toEqual(expectedUser);
  });

  it('should throw ConflictException when email already exists', async () => {
    const dto = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const existingUser = new UserEntity({
      id: '1',
      ...dto,
    });

    mockRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(useCase.execute(dto)).rejects.toThrow(ConflictException);
    await expect(useCase.execute(dto)).rejects.toThrow('email already exists');
  });
});
