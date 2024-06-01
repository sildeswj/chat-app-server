import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Chatroom } from './chatroom.schema';
import { Users } from './users.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class ChatHistory {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatroom',
  })
  roomId: Chatroom;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: Users;

  @Prop({ required: true })
  contents: string;
}

export const ChatHistorySchema = SchemaFactory.createForClass(ChatHistory);
