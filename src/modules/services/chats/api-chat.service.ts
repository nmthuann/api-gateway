import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ConversationDto } from "./chat-dto/chat.dto";


const chatServiceIp = "10.251.5.37";
@Injectable()
export class ApiGatewayChatService {

    public async createConversation(conversationDto: ConversationDto): Promise<any>{
        // const data = conversationDto;
        const url = `http://${chatServiceIp}:8800/api/conversations/`;
        try {
            const response = await axios.post(url, conversationDto); 
            return await response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    public async  createMessage(conversationDto: ConversationDto): Promise<any>{
        const data = conversationDto;
        const url = `http://${chatServiceIp}:8800/api/messages/`;
        try {
            const response = await axios.post(url, data); 0
            return await response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}