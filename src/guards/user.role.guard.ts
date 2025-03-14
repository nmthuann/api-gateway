import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //  get context in reflector
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    //  check the request is public
    if (isPublic) return true;
    else {
      const request = context.switchToHttp().getRequest();
      const payload = request['user'];
      // Kiểm tra và xử lý vai trò của người dùng
      if (payload['role'] == Role.Admin) {
        throw new ForbiddenException('Access denied - You are not User!');
      }
      request['email'] = payload['email'];
      return true;
    }
  }
}
