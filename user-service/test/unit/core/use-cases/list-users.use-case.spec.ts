import { Test, TestingModule } from '@nestjs/testing';
import { ListUsersUseCase } from '../../../../src/core/use-cases/list-users/list-users.use-case';
import { USER_REPOSITORY } from '../../../../src/core/domain/repositories/user.repository.interface';
import { UserEntity } from '../../../../src/core/domain/entities/user.entity';

describe('ListUsersUseCase', () => {
  let useCase: ListUsersUseCase;
  let mockRepository: { findAll: jest.Mock };

  beforeEach(async () => {
    mockRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUsersUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<ListUsersUseCase>(ListUsersUseCase);
  });

  it('should return list of users', async () => {
    const users = [
      new UserEntity({
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'hashed',
      }),
      new UserEntity({
        id: '2',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        password: 'hashed',
      }),
    ];

    mockRepository.findAll.mockResolvedValue(users);

    const result = await useCase.execute();

    expect(mockRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(users);
    expect(result).toHaveLength(2);
  });

  it('should return empty array when no users exist', async () => {
    mockRepository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});
