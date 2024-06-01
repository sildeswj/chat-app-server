import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDoc } from './interfaces/user-document.interface';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<UserDoc>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(createUserDto);
    return {
      _id: newUser._id,
      userName: newUser.userName,
    };
  }

  async findAll(): Promise<User[]> {
    const userDocs = await this.userModel.find().exec();
    return userDocs.map((doc) => ({
      _id: doc._id,
      userName: doc.userName,
    }));
  }

  async findOne(_id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: _id }).exec();
    return {
      _id: user._id,
      userName: user.userName,
    };
  }

  async findOneByUserName(userName: string): Promise<User> {
    const user = await this.userModel.findOne({ userName: userName }).exec();
    if (!user) throw new HttpException('User not found', 404);

    return {
      _id: user._id,
      userName: user.userName,
    };
  }

  async findOneOrCreate(
    userName: string,
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const user = await this.userModel.findOne({ userName: userName }).exec();
    if (!user) {
      const newUser = await this.create({ userName, ...createUserDto });
      return {
        _id: newUser._id,
        userName: newUser.userName,
      };
    }
    return {
      _id: user._id,
      userName: user.userName,
    };
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      _id,
      updateUserDto,
    );
    return {
      _id: updatedUser._id,
      userName: updatedUser.userName,
    };
  }

  remove(_id: string): Promise<{ deleted: boolean; message?: string }> {
    return this.userModel.findByIdAndDelete(_id);
  }
}
