import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import { ExitRoomDto } from './dto/exit-room.dto';

@Controller('chat-room')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Post()
  create(@Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatRoomService.create(createChatRoomDto);
  }

  @Get()
  findAll() {
    return this.chatRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatRoomService.findOne(+id);
  }

  @Patch('/exit-room')
  exitRoom(@Body() exitRoomDto: ExitRoomDto) {
    return this.chatRoomService.exitRoom(exitRoomDto);
  }

  @Patch('/update-chatroom-user')
  updateChatroomUser(@Body() updateChatRoomUserDto: ExitRoomDto) {
    return this.chatRoomService.updateChatRoomUser(updateChatRoomUserDto);
  }

  @Patch(':_id')
  update(
    @Param('_id') _id: string,
    @Body() updateChatRoomDto: UpdateChatRoomDto,
  ) {
    return this.chatRoomService.update(_id, updateChatRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatRoomService.remove(+id);
  }
}
