import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

const options: SchemaOptions = {
  timestamps: true,
};
@Schema(options)
export class Users {
  @Prop({ required: true, unique: true })
  userName: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
