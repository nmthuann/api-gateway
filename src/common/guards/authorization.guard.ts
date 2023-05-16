import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationnGuard extends AuthGuard('jwt') {
  constructor(
      private reflector: Reflector
  ) { 
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
        context.getHandler(),
        context.getClass(), 
    ]);

    if (isPublic) return true;

    console.log(super.canActivate(context));
    return super.canActivate(context);
  }
}
