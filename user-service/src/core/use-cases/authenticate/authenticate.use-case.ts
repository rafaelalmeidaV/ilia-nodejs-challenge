import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';
import { AuthenticateDto, AuthResponseDto } from './authenticate.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticateUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: AuthenticateDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid credentials');
    }

    if (!user.isActive()) {
      throw new UnauthorizedException('user is not active');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id!,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      access_token,
    };
  }
}
