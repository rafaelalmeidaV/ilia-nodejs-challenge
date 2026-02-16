import { UserStatus } from '../enums/user-status.enum';

export class UserEntity {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  status: UserStatus;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    status?: UserStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.first_name = props.first_name;
    this.last_name = props.last_name;
    this.email = props.email;
    this.password = props.password;
    this.status = props.status || UserStatus.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;

    this.validate();
  }

  private validate(): void {
    if (!this.first_name || this.first_name.trim().length === 0) {
      throw new Error('first_name is required');
    }

    if (!this.last_name || this.last_name.trim().length === 0) {
      throw new Error('last_name is required');
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      throw new Error('valid email is required');
    }

    if (!this.password || this.password.length < 6) {
      throw new Error('password must be at least 6 characters');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getFullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  isActive(): boolean {
    return this.status === UserStatus.ACTIVE;
  }
}
