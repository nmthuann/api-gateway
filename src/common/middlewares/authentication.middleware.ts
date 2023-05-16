import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from 'src/modules/redis/redis.service';
import * as dotenv from 'dotenv';
import { ProducerService } from 'src/modules/kafka/producer.service';
dotenv.config();


@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly producerService: ProducerService,
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
        req['user'] = this.jwtService.decode(token);
        next();
      } catch (error) {
        const exp = this.jwtService.decode(token); // decode -> expired

        //  decode is success -> check cache in redis
        if(exp){
          const checkExist = await this.redisService.getCurrentUserInCache(exp['email']);
          if (checkExist['refresh_token']){
            //  update refresh token
            await this.producerService.sendMessage(
              'update-refresh-token', 
              checkExist['refresh_token'], 
              60000
            );
            
            // next
            req['user'] = exp;
            next();
          }
          else{
            res.status(HttpStatus.FORBIDDEN)
            .json({ message: 'Login again' });
          }
        }

        res.status(HttpStatus.FORBIDDEN)
        .json({ message: 'Invalid or expired token' });
      } 
    }
  }
}
