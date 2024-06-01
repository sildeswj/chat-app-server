import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatHistoryDto {
  @IsNotEmpty()
  @IsString()
  roomId;

  @IsNotEmpty()
  @IsString()
  userId;

  @IsNotEmpty()
  @IsString()
  contents;
}
