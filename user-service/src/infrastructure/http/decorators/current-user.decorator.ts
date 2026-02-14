import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserData } from '../interfaces/current-user-data.interface';

type RequestWithUser = Request & {
  user: CurrentUserData;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserData => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
