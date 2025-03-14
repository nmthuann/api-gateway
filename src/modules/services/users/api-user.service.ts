import { Injectable } from '@nestjs/common';
import { CreateInformationDto } from './dtos/create-information.dto';
import { CreateProfileDto } from './dtos/create-profile.dto';
import axios from 'axios';
import { ProfileDocumentDto } from './dtos/profile.document.dto';

@Injectable()
export class ApiGatewayUserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public async getUserByEmail(token: string) {
    const url = `http://localhost:8088/user/profile-document/get-user`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  public async createInformation(
    token: string,
    inforDto: CreateInformationDto,
  ): Promise<any> {
    const url = `http://localhost:8088/user/profile-document/create-information`;
    const data = inforDto;
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  public async createProfile(
    token: string,
    profileDto: CreateProfileDto,
  ): Promise<ProfileDocumentDto> {
    const url = `http://localhost:8088/user/profile-document/create-profile`;
    const data = profileDto;
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  public async getUsers(): Promise<any> {
    const url = `http://localhost:8088/user/auth/show-list`;
    try {
      const response = await axios.get(
        url,
        //   {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  public async getProfiles(token: string): Promise<any> {
    const url = `http://localhost:8088/user/profile-document/get-profile-list`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}

// async createInformation(inforDto: CreateInformationDto, resTopic: string){
//   //  send message for User Service handling!
//   await this.producerService.sendMessage('create-infor-req', inforDto, 60000);
//   //  get new information
//   const newInfor = await this.consumerService.handleMessage<any>('api-gateway', resTopic);
//   return newInfor;
// }

// async createProfile(profileDto: CreateProfileDto, resTopic: string){
//   //  send message for User Service handling!
//   await this.producerService.sendMessage('create-profile-req', profileDto, 60000);
//   const newProfile = await this.consumerService.handleMessage<any>('api-gateway', resTopic);
//   return newProfile;
// }

// async getUsers(resTopic: string){
//   await this.producerService.sendMessage('getUsers-req', 'getUsers', 60000);
//   const users = await this.consumerService.handleMessage<any>('api-gateway', resTopic);
//   return users;
// }
