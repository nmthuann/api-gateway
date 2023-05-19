import { 
  CACHE_MANAGER, 
  HttpException, 
  HttpStatus, 
  Inject, 
  Injectable, 
  NestMiddleware 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { Tokens } from 'src/modules/bases/types/token.type';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {

    // get header from request
    const authHeader = req.headers.authorization;
    
    if (typeof authHeader === 'undefined') {
      throw new HttpException(
        'Middleware - Unauthorized: 401 - header empty!',  
        HttpStatus.UNAUTHORIZED
      ); //res.sendStatus(401);
    } 
    else{
      //  cut token
      const token: string = req.get('authorization').replace('Bearer', '').trim();
      console.log("token: ", token);

      //  check valid of token
      try {
        await this.jwtService.verifyAsync(
          token,
          {
            secret: 'JWT_SECRET_KEY',
          }
        ); 
        req['user'] = (this.jwtService.decode(token))['payload'];
        req['token'] = token;
        next(); // -> guard (1)

      //  1. expired  2. Not invalid
      } catch (error) { 

        //  handle Error 1: decode -> expired
        const checkExpired = this.jwtService.decode(token);
        console.log("checkExpired: ", checkExpired)

        //  decode is success -> check cache in redis
        if(typeof checkExpired !== 'undefined'){

          const getValueByKeyInRedis: string = 
          await this.cacheService.get(checkExpired['payload']['email']);
          console.log(": checkEmailExist:", getValueByKeyInRedis);

          //  refresh token not empty -> update refresh token -> req to auth service
          if (getValueByKeyInRedis) {
            const url = `http://localhost:8088/user/auth/refresh-token`;
            const data = JSON.stringify(getValueByKeyInRedis);
            const refresh_token = data['refresh_token'];
            const response = await axios.post(url, refresh_token, {
              headers: {
                'Authorization': `Bearer ${token}` 
              }
            });


            //  check response of Refesh token API
            if (response == null){
              res.status(HttpStatus.FORBIDDEN)
              .json({ message: 'refresh token null - Please Login again!' });
            }
            else {  //  res not null -> stay logged in!

              //   response.headers.set = `Authorization Bearer ${response.data['access_token']}`;
              await this.cacheService.set((checkExpired['payload']['email']), response.data, 60000);
              req['user'] = checkExpired['payload'];
              req['token'] = response.data['access_token'];
              next();  //  -> guard (2)
            }

            
          }
          else{
            res.status(HttpStatus.FORBIDDEN)
            .json({ message: 'Please Login again - decode fail' });
          }
        }else{
          res.status(HttpStatus.FORBIDDEN)
          .json({ message: 'Invalid or expired token' });
        }
      } 
    }
  }
}



            // await this.producerService.sendMessage(
            //   'update-refresh-token', 
            //   checkExist['refresh_token'], 
            //   60000
            // );


  //           const onRequestSuccess = (config: AxiosRequestConfig) => {
  //   const auth = getCookie(Authenticate.AUTH);
  //   config.timeout = 10000;
  //   if (auth) {
  //     config.headers = {
  //       Authorization: "Bearer " + auth,
  //       "x-api-key": keyHearder
  //     };
  //     // Xử lý params cho request
  //     if (config.params) {
  //       config.paramsSerializer = {
  //         serialize: (params: Record<string, any>) =>
  //           queryString.stringify(params)
  //       }
  //     }
  //   }
  //   // Các xử lý khác....
  //   return config;
  // };