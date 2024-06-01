import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ChatRoomUser } from './chatRoomUser.schema';

// export type ChatroomDocument = HydratedDocument<Chatroom>;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Chatroom {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoomUser' }],
  })
  chatroomUsers?: ChatRoomUser[];

  @Prop()
  lastContents: string;

  @Prop({ required: false })
  chatroomUsersId?: ChatRoomUser[];
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);
