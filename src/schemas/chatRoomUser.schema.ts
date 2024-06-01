import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Users } from './users.schema';
import mongoose from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class ChatRoomUser {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  })
  user: Users;

  @Prop({
    type: Date,
    expires: '30m',
    default: Date.now,
  })
  expiredAt: Date;
}

export const ChatRoomUserSchema = SchemaFactory.createForClass(ChatRoomUser);
