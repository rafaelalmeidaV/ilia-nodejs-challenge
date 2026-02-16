import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateUseCase } from '../../../../src/core/use-cases/authenticate/authenticate.use-case';
import { USER_REPOSITORY } from '../../../../src/core/domain/repositories/user.repository.interface';
import { UserEntity } from '../../../../src/core/domain/entities/user.entity';
import { UserStatus } from '../../../../src/core/domain/enums/user-status.enum';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthenticateUseCase', () => {
  let useCase: AuthenticateUseCase;
  let mockRepository: { findByEmail: jest.Mock };
  let mockJwtService: { sign: jest.Mock };

  beforeEach(async () => {
    mockRepository = {
      findByEmail: jest.fn(),
    };

    mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    useCase = module.get<AuthenticateUseCase>(AuthenticateUseCase);
  });

  it('should authenticate user successfully', async () => {
    const dto = {
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const user = new UserEntity({
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: dto.email,
      password: 'hashed_password',
      status: UserStatus.ACTIVE,
    });

    const token = 'jwt_token_here';

    mockRepository.findByEmail.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    mockJwtService.sign.mockReturnValue(token);

    const result = await useCase.execute(dto);

    expect(mockRepository.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(dto.password, user.password);
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: user.id,
      email: user.email,
    });
    expect(result).toEqual({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      access_token: token,
    });
  });

  it('should throw UnauthorizedException when user not found', async () => {
    const dto = {
      email: 'notfound@example.com',
      password: 'password123',
    };

    mockRepository.findByEmail.mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(UnauthorizedException);
    await expect(useCase.execute(dto)).rejects.toThrow('invalid credentials');
  });

  it('should throw UnauthorizedException when password is invalid', async () => {
    const dto = {
      email: 'john.doe@example.com',
      password: 'wrong_password',
    };

    const user = new UserEntity({
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: dto.email,
      password: 'hashed_password',
      status: UserStatus.ACTIVE,
    });

    mockRepository.findByEmail.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(useCase.execute(dto)).rejects.toThrow(UnauthorizedException);
    await expect(useCase.execute(dto)).rejects.toThrow('invalid credentials');
  });

  it('should throw UnauthorizedException when user is not active', async () => {
    const dto = {
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const user = new UserEntity({
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: dto.email,
      password: 'hashed_password',
      status: UserStatus.INACTIVE,
    });

    mockRepository.findByEmail.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await expect(useCase.execute(dto)).rejects.toThrow(UnauthorizedException);
    await expect(useCase.execute(dto)).rejects.toThrow('user is not active');
  });
});
