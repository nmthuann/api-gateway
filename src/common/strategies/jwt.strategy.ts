import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from 'src/modules/bases/types/payload.type';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() 
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'JWT_SECRET_KEY' , //process.env.JWT_SECRET_KEY,
    });
  }

  validate(payload: any) {
    console.log('validate - JsonWebTokenStrategy: ', payload.role);
    return payload;
  } 
}