import { UserEntity } from '../../../../../src/core/domain/entities/user.entity';
import { UserStatus } from '../../../../../src/core/domain/enums/user-status.enum';

describe('UserEntity', () => {
  it('should create a valid user entity', () => {
    const user = new UserEntity({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(user.first_name).toBe('John');
    expect(user.last_name).toBe('Doe');
    expect(user.email).toBe('john.doe@example.com');
    expect(user.password).toBe('password123');
    expect(user.status).toBe(UserStatus.ACTIVE);
  });

  it('should create user with custom status', () => {
    const user = new UserEntity({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      status: UserStatus.INACTIVE,
    });

    expect(user.status).toBe(UserStatus.INACTIVE);
  });

  it('should throw error when first_name is empty', () => {
    expect(() => {
      new UserEntity({
        first_name: '',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });
    }).toThrow('first_name is required');
  });

  it('should throw error when last_name is empty', () => {
    expect(() => {
      new UserEntity({
        first_name: 'John',
        last_name: '',
        email: 'john.doe@example.com',
        password: 'password123',
      });
    }).toThrow('last_name is required');
  });

  it('should throw error when email is invalid', () => {
    expect(() => {
      new UserEntity({
        first_name: 'John',
        last_name: 'Doe',
        email: 'invalid-email',
        password: 'password123',
      });
    }).toThrow('valid email is required');
  });

  it('should throw error when password is too short', () => {
    expect(() => {
      new UserEntity({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: '12345',
      });
    }).toThrow('password must be at least 6 characters');
  });

  it('should return full name', () => {
    const user = new UserEntity({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(user.getFullName()).toBe('John Doe');
  });

  it('should check if user is active', () => {
    const activeUser = new UserEntity({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      status: UserStatus.ACTIVE,
    });

    const inactiveUser = new UserEntity({
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
      status: UserStatus.INACTIVE,
    });

    expect(activeUser.isActive()).toBe(true);
    expect(inactiveUser.isActive()).toBe(false);
  });
});
