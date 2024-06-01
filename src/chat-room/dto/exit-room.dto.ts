import { IsNotEmpty, IsString } from 'class-validator';

export class ExitRoomDto {
  @IsNotEmpty()
  @IsString()
  userId;

  @IsNotEmpty()
  @IsString()
  roomId;
}
