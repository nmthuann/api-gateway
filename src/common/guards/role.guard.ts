import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/modules/bases/enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

    canActivate(context: ExecutionContext): boolean {

      //  get context in reflector
      const isPublic = this.reflector.getAllAndOverride('isPublic', [
        context.getHandler(),
        context.getClass(), 
      ]);

      //  check the request is public
      if (isPublic) return true;
      else{
        const request = context.switchToHttp().getRequest();
        const token = request['user']; // Lấy thông tin người dùng từ request object

        // Kiểm tra và xử lý vai trò của người dùng
        const decode_token = this.jwtService.decode(token);
        if (decode_token['role'] != Role.Admin){
          
          // request['email'] = decode_token['email'];
          // next();
          //  Hoặc trả về false nếu không đủ quyền truy cập
          throw new ForbiddenException('Access denied'); 
        }
        request['email'] = decode_token['email'];
        return true;
      }
    }  
}