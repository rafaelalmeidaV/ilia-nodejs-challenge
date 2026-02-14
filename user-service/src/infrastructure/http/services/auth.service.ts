import { Injectable } from '@nestjs/common';
import { AuthenticateUseCase } from '../../../core/use-cases/authenticate/authenticate.use-case';
import { AuthResponseDto } from '../../../core/use-cases/authenticate/authenticate.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  async authenticate(
    email: string,
    password: string,
  ): Promise<AuthResponseDto> {
    return await this.authenticateUseCase.execute({ email, password });
  }
}
