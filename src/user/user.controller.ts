import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/userName')
  findOneByUserName(@Query('userName') userName: string): Promise<User> {
    return this.userService.findOneByUserName(userName);
  }

  @Get('/find-one-or-create')
  findOneOrCreate(@Query('userName') userName: string): Promise<User> {
    const createUserDto = { ...CreateUserDto, userName };
    return this.userService.findOneOrCreate(userName, createUserDto);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string): Promise<User> {
    return this.userService.findOne(_id);
  }

  @Patch(':_id')
  update(
    @Param('_id') _id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(_id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') _id: string): Promise<{ deleted: boolean }> {
    return this.userService.remove(_id);
  }
}
