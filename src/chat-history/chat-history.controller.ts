import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';
import { CreateChatHistoryDto } from './dto/create-chat-history.dto';
import { ChatHistory } from '../schemas/chatHistory.schema';

@Controller('chat-history')
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) {}

  @Post()
  create(@Body() createChatHistoryDto: CreateChatHistoryDto) {
    return this.chatHistoryService.create(createChatHistoryDto);
  }

  @Get('/find-all-by-id')
  findAllById(@Query('roomId') roomId: string): Promise<ChatHistory[]> {
    return this.chatHistoryService.findAllById(roomId);
  }
}
