import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from 'src/modules/redis/redis.service';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // get header from request
    const authHeader = req.headers.authorization;
    
    if (typeof authHeader === 'undefined') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED); //res.sendStatus(401);
    } 
    else{
      //  cut token
      const token = req.get('authorization').replace('Bearer', '').trim();

      //  check valid of token
      try {
        const author = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_SECRET,
          }
        );
        req['user'] = author;
        next();
      } catch (error) {
        // req['user'] = 'not email';
        // next();
        res.status(HttpStatus.FORBIDDEN)
        .json({ message: 'Invalid or expired token' });
      } 
    }
  }
}
