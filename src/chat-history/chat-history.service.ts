import { Injectable } from '@nestjs/common';
import { CreateChatHistoryDto } from './dto/create-chat-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatHistory } from '../schemas/chatHistory.schema';

@Injectable()
export class ChatHistoryService {
  constructor(
    @InjectModel(ChatHistory.name)
    private readonly chatHistoryModel: Model<ChatHistory>,
  ) {}

  async create(
    createChatHistoryDto: CreateChatHistoryDto,
  ): Promise<ChatHistory> {
    const newChatHistory =
      await this.chatHistoryModel.create(createChatHistoryDto);
    return newChatHistory;
  }

  async findAllById(roomId: string): Promise<ChatHistory[]> {
    const chatHistory = await this.chatHistoryModel.find({ roomId: roomId });
    return chatHistory;
  }
}
