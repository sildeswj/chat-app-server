import { Module } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomController } from './chat-room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chatroom, ChatroomSchema } from '../schemas/chatroom.schema';
import {
  ChatRoomUser,
  ChatRoomUserSchema,
} from '../schemas/chatRoomUser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatroom.name, schema: ChatroomSchema },
      { name: ChatRoomUser.name, schema: ChatRoomUserSchema },
    ]),
  ],
  controllers: [ChatRoomController],
  providers: [ChatRoomService],
})
export class ChatRoomModule {}
