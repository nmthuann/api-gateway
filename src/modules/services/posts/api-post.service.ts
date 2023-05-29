import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client';
import { PostDto } from './post-dto/post.dto';
import { ProducerService } from 'src/modules/kafka/producer.service';
import { ConsumerService } from 'src/modules/kafka/consumer.service';
import axios from 'axios';
import { CategoryDto } from './category-dto/category.dto';

@Injectable()
export class ApiGatewayPostService {
  constructor(
    // @Inject('POST_SERVICE') 
    // private readonly postClient: ClientKafka,
    // private consumerService: ConsumerService,
  ){}

  async createPost(token: string, postDto: PostDto){
    const url = `http://localhost:8089/post/posts/create`;
    const data = postDto;
    try {
      const response = await axios.post(url, data, {
         headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getPosts(){ 
    const url = `http://localhost:8089/post/posts/get-posts`;
    try {
      const response = await axios.get(url, 
      //   {
      //    headers: {
      //     'Authorization': `Bearer ${token}` 
      //   }
      // }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }


  async getCategories(){ 
    const url = `http://localhost:8089/post/category/get-categories`;
    try {
      const response = await axios.get(url, 
      //   {
      //    headers: {
      //     'Authorization': `Bearer ${token}` 
      //   }
      // }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }


  async createCategory(token: string, categoryDto: CategoryDto): Promise<CategoryDto>{ 
    const url = `http://localhost:8089/post/category/create`;
    try {
      const response = await axios.post(url, categoryDto, {
         headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }


  async updateCategoryById(token: string, id: number, categoryDto: CategoryDto): Promise<CategoryDto>{ 
    const url = `http://localhost:8089/post/category/update/${id}`;
    try {
      const response = await axios.put(url, categoryDto, {
         headers: {
          'Authorization': `Bearer ${token}`   
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }


  async getCategoryById(token: string, id: number): Promise<CategoryDto>{ 
    const url = `http://localhost:8089/post/category/${id}`;
    try {
      const response = await axios.get(url, {
         headers: {
          'Authorization': `Bearer ${token}` 
        }
      }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getCategoryDetailsByCategoryId(id: number){ 
    const url = `http://localhost:8089/post/category/category-detail-list/${id}`;
    try {
      const response = await axios.get(url,
      //    {
      //    headers: {
      //     'Authorization': `Bearer ${token}` 
      //   }
      // }
      );
      return response.data[0].category_detail;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }


  async getPostsByCategoryDetailId(id: number){ 
    const url = `http://localhost:8089/post/posts/get-posts/${id}`;
    try {
      const response = await axios.get(url,
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

    async getCategoryDetails(){ 
    const url = `http://localhost:8089/post/category-detail/CategoryDetails`;
    try {
      const response = await axios.get(url,
        //   {
        //     headers: {
        //       'Authorization': `Bearer ${token}` 
        //     }
        // }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }


  async getPostById(id: number): Promise<PostDto>{ 
    const url = `http://localhost:8089/post/posts/get-post/${id}`;
    try {
      const response = await axios.get(url,
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }


  async getPostByEmail(token: string): Promise<PostDto[]>{ 
    const url = `http://localhost:8089/post/posts/get-post-user`;
    try {
      const response = await axios.get(url,
      //   {
      //    headers: {
      //     'Authorization': `Bearer ${token}` 
      //   }
      // }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  // async getEmail(post_id: number): Promise<string>{
  //   const post = await this.getPostById(post_id);
  //   const profile_user = post.post_detail.profile_user;
  //   return profile_user;
  // }

  // async getPostAndProfile(post_id: number){
  //   const email = await this.getEmail(post_id);
  //   const profile = await this.getProfileByEmailForPost(email);
  // }

  // async getProfileByEmailForPost(email: string){
  //   const url = `http://localhost:8088/user/profile-document/get-user/${email}`;
  //   try {
  //     const response = await axios.get(url);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(error.response.data.message);
  //   }
  // }


}

//  async createPost(postDto: PostDto,  resTopic: string){
//     this.postClient.emit('post_created', JSON.stringify(postDto));
//     const postCreated = await this.consumerService.handleMessage<any>('api-gateway', resTopic);
//     return postCreated;
//   }

//   async getPosts(resTopic: string){ 
//     this.postClient.emit('getPosts-req', 'get-list');
//     const posts = await this.consumerService.handleMessage<any>('api-gateway', resTopic);
//     return posts;
//   }