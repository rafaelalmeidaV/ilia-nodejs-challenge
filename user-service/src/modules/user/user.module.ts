import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from '../../infrastructure/database/mongodb/schemas/user.schema';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import { USER_REPOSITORY } from '../../core/domain/repositories/user.repository.interface';
import { CreateUserUseCase } from '../../core/use-cases/create-user/create-user.use-case';
import { GetUserUseCase } from '../../core/use-cases/get-user/get-user.use-case';
import { ListUsersUseCase } from '../../core/use-cases/list-users/list-users.use-case';
import { UpdateUserUseCase } from '../../core/use-cases/update-user/update-user.use-case';
import { DeleteUserUseCase } from '../../core/use-cases/delete-user/delete-user.use-case';
import { AuthenticateUseCase } from '../../core/use-cases/authenticate/authenticate.use-case';
import { UserController } from '../../infrastructure/http/controllers/user.controller';
import { AuthController } from '../../infrastructure/http/controllers/auth.controller';
import { UserService } from '../../infrastructure/http/services/user.service';
import { AuthService } from '../../infrastructure/http/services/auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UserController, AuthController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    CreateUserUseCase,
    GetUserUseCase,
    ListUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    AuthenticateUseCase,
    UserService,
    AuthService,
  ],
  exports: [UserService],
})
export class UserModule {}
