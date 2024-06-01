import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ChatRoomController } from './chat-room.controller';
import { Chatroom } from '../schemas/chatroom.schema';
import { ChatRoomService } from './chat-room.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';

describe('ChatRoomController', () => {
  let chatRoomService: ChatRoomService;
  let chatRoomController: ChatRoomController;
  let model: Model<Chatroom>;

  const mockChatRoom = {
    _id: '61c0ccf11d7bf83d153d7c06',
    roomId: '61c0ccf11d7bf83d153d7c06',
    userId: '61c0ccf11d7bf83d153d7c06',
    contents: 'Book Description',
  };

  const mockQuery = [
    {
      $lookup: {
        as: 'chatroomUserJoin',
        foreignField: '_id',
        from: 'chatroomusers',
        localField: 'chatroomUsers',
      },
    },
    {
      $project: {
        _id: 1,
        activeUser: {
          $cond: {
            else: 0,
            if: { $isArray: '$chatroomUserJoin' },
            then: { $size: '$chatroomUserJoin' },
          },
        },
        createdAt: 1,
        title: 1,
        updatedAt: 1,
      },
    },
    { $sort: { activeUser: -1 } },
  ];

  const mockChatRoomService = {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    aggregate: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatRoomController],
      providers: [
        {
          provide: ChatRoomService,
          useValue: mockChatRoomService,
        },
      ],
    }).compile();

    chatRoomService = module.get<ChatRoomService>(ChatRoomService);
    chatRoomController = module.get<ChatRoomController>(ChatRoomController);
  });

  it('should be defined', () => {
    expect(chatRoomController).toBeDefined();
  });

  describe('getAllChatRooms', () => {
    it('should get all chatrooms', async () => {
      const result = await chatRoomController.findAll();
      expect(chatRoomService.findAll).toHaveBeenCalled();
      expect(result).toEqual(undefined);
    });
  });

  describe('createChatRoom', () => {
    it('should create a new chatroom', async () => {
      const newChatRoom = {
        title: 'test',
        lastContents: 'hi',
      };

      mockChatRoomService.create = jest
        .fn()
        .mockResolvedValueOnce(mockChatRoom);

      const result = await chatRoomController.create(
        newChatRoom as CreateChatRoomDto,
      );

      expect(chatRoomService.create).toHaveBeenCalled();
      expect(result).toEqual(mockChatRoom);
    });
  });
});
