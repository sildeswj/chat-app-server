import { Document } from 'mongoose';

export interface UserDoc extends Document {
  id: string;
  userName: string;
}
