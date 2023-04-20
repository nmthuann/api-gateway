import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from 'src/modules/redis/redis.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction) {

    const token = req.get('authorization').replace('Bearer', '').trim();
    console.log("midddleware-token: ",token);

    if (!token) res.sendStatus(401);
    try {
        const author = await this.jwtService.verifyAsync(token);
        if(!author){
            console.log("Loi author!");
            res.sendStatus(403);
        } 
        else{
            const tokenMatch = this.jwtService.decode(token);
            const currentUser = tokenMatch['email']; // check here
            console.log('ai gửi request này:', currentUser)
            const checkEmailRedis = this.redisService.get(currentUser);
            if(!checkEmailRedis) res.sendStatus(401)          
        }
    } catch (error) {
        console.log(error)
    }
    next();
  }
}