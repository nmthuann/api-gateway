import {  CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import { ProducerService } from 'src/modules/kafka/producer.service';
import { ConsumerService } from 'src/modules/kafka/consumer.service';
import { Cache } from 'cache-manager';
import { Payload } from 'src/modules/bases/types/payload.type';
import { JwtService } from '@nestjs/jwt';
import { CreateInformationDto } from './user-dto/create-information.dto';
import { CreateProfileDto } from './user-dto/create-profile.dto';


@Injectable()
export class ApiGatewayUserService {
  constructor(
    private producerService: ProducerService,
    private consumerService: ConsumerService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}    


  async createInformation(inforDto: CreateInformationDto, resTopic: string){
    //  send message for User Service handling!
    await this.producerService.sendMessage('create-infor-req', inforDto, 60000);
    //  get new information
    const newInfor = await this.consumerService.handleMessage<any>('api-gateway', resTopic);
    return newInfor;
  }
  
  async createProfile(profileDto: CreateProfileDto, resTopic: string){
    //  send message for User Service handling!
    await this.producerService.sendMessage('create-profile-req', profileDto, 60000);
    const newProfile = await this.consumerService.handleMessage<any>('api-gateway', resTopic);
    return newProfile;
  }

  async getUsers(resTopic: string){
    await this.producerService.sendMessage('getUsers-req', 'getUsers', 60000);
    const users = await this.consumerService.handleMessage<any>('api-gateway', resTopic);
    return users;
  }
}