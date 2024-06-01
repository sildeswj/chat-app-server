import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  _id: string;
  @IsNotEmpty()
  @IsString()
  userName: string;
}
