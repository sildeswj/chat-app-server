import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateChatRoomUserDto {
  @IsNotEmpty()
  @IsArray()
  chatroomUsers;
}

export class CreateChatRoomDto {
  @IsNotEmpty()
  @IsString()
  title;

  @IsOptional()
  // chatroomUsers;
  @ValidateNested()
  chatroomUsers?: CreateChatRoomUserDto;

  @IsString()
  @IsOptional()
  lastContents;

  @IsString()
  @IsOptional()
  userId;
}
