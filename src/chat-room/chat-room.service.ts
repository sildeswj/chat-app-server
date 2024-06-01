import { Injectable } from '@nestjs/common';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chatroom } from '../schemas/chatroom.schema';
import { ChatRoomUser } from '../schemas/chatRoomUser.schema';
import { ExitRoomDto } from './dto/exit-room.dto';

const ObjectId = Types.ObjectId;

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectModel(Chatroom.name) private readonly chatroomModel: Model<Chatroom>,
    @InjectModel(ChatRoomUser.name)
    private readonly chatroomUserModel: Model<ChatRoomUser>,
  ) {}

  async create({ chatroomUsers, ...createChatRoomDto }: CreateChatRoomDto) {
    if (!chatroomUsers) {
      const savedNewChatRoom = await this.chatroomUserModel.create({
        user: createChatRoomDto.userId,
      });
      if (savedNewChatRoom?._id) {
        const newChatRoom = await this.chatroomModel.create({
          ...createChatRoomDto,
          chatroomUsers: savedNewChatRoom._id,
        });
        return newChatRoom;
      }
    }
    const newChatRoom = await this.chatroomModel.create(createChatRoomDto);
    return newChatRoom;
  }

  async findAll() {
    const chatRooms = await this.chatroomModel.aggregate([
      {
        $lookup: {
          from: 'chatroomusers',
          localField: 'chatroomUsers',
          foreignField: '_id',
          as: 'chatroomUserJoin',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          createdAt: 1,
          updatedAt: 1,
          activeUser: {
            $cond: {
              if: {
                $isArray: '$chatroomUserJoin',
              },
              then: {
                $size: '$chatroomUserJoin',
              },
              else: 0,
            },
          },
        },
      },
      {
        $sort: {
          activeUser: -1,
        },
      },
    ]);
    return chatRooms;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatRoom`;
  }

  async update(_id: string, updateChatRoomDto: UpdateChatRoomDto) {
    const updatedChatRoom = await this.chatroomModel.findByIdAndUpdate(
      _id,
      updateChatRoomDto,
    );
    return updatedChatRoom;
  }

  async exitRoom(exitRoomDto: ExitRoomDto) {
    const updatedExitRoom =
      await this.chatroomUserModel.findOneAndDelete(exitRoomDto);
    const updatedChatRoom = await this.chatroomModel.updateMany(
      { match: { _id: updatedExitRoom._id } },
      { $pull: { chatroomUsers: { _id: updatedExitRoom._id } } },
    );
    return updatedChatRoom;
  }

  async updateChatRoomUser(updateChatRoomUser: ExitRoomDto) {
    const findChatRoom = await this.chatroomModel.aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(updateChatRoomUser.roomId),
        },
      },
      {
        $lookup: {
          from: 'chatroomusers',
          localField: 'chatroomUsers',
          foreignField: '_id',
          as: 'chatroomUsersId',
        },
      },
      {
        $match: {
          'chatroomUsersId.user': ObjectId.createFromHexString(
            updateChatRoomUser.userId,
          ),
        },
      },
    ]);

    if (findChatRoom && findChatRoom.length) {
      const updatedChatRoomUser = await this.chatroomUserModel.updateOne(
        {
          _id: findChatRoom[0].chatroomUsersId[0]._id,
        },
        {
          user: ObjectId.createFromHexString(updateChatRoomUser.userId),
          $set: { expiredAt: new Date() },
        },
        { upsert: true },
      );
    } else {
      const createChatRoomUser = await this.chatroomUserModel.create({
        user: ObjectId.createFromHexString(updateChatRoomUser.userId),
      });
      const updateChatRoom = await this.chatroomModel.updateOne(
        { _id: ObjectId.createFromHexString(updateChatRoomUser.roomId) },
        { $addToSet: { chatroomusers: createChatRoomUser._id } },
        { upsert: true },
      );
    }

    return findChatRoom;
  }

  remove(id: number) {
    return `This action removes a #${id} chatRoom`;
  }
}
