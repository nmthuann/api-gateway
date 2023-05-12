import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/modules/bases/enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request['user']; // Lấy thông tin người dùng từ request object
        // const token = request.get('authorization').replace('Bearer', '').trim();

        // Kiểm tra và xử lý vai trò của người dùng
        const decode_token = this.jwtService.decode(token);
        if (decode_token['role'] != Role.Admin){
            throw new ForbiddenException('Access denied'); // Hoặc trả về false nếu không đủ quyền truy cập
        }
        return true;
    }
}