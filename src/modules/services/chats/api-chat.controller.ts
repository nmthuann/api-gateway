import { Controller, Post, UseGuards, Request, Param } from '@nestjs/common';
import { ApiGatewayChatService } from './api-chat.service';
import { RolesGuard } from 'src/guards/role.guard';
import { ConversationDto } from './dtos/chat.dto';

@Controller('chat')
export class ApiGatewayChatController {
  constructor(private readonly apiGatewayChatService: ApiGatewayChatService) {}

  @UseGuards(RolesGuard)
  @Post('conversations/:toUserId')
  async createConversation(
    @Request() req: any,
    @Param('toUserId') toUserId: string,
  ): Promise<any> {
    const email = req['email'];
    const conversationDto: ConversationDto = {
      from: '',
      to: '',
    };
    conversationDto.from = email;
    conversationDto.to = toUserId;
    console.log(conversationDto);
    return this.apiGatewayChatService.createConversation(conversationDto);
  }
}
