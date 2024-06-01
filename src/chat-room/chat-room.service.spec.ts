import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { Chatroom } from '../schemas/chatroom.schema';
import { ChatRoomUser } from '../schemas/chatRoomUser.schema';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';

describe('ChatRoomService', () => {
  let chatRoomService: ChatRoomService;
  let model: Model<Chatroom>;
  let chatRoomUserModel: Model<ChatRoomUser>;

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
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    aggregate: jest.fn(),
    exec: jest.fn(),
  };

  const mockChatRoomUserService = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatRoomUser],
      providers: [
        ChatRoomService,
        {
          provide: getModelToken(Chatroom.name),
          useValue: mockChatRoomService,
        },
        {
          provide: getModelToken(ChatRoomUser.name),
          useValue: mockChatRoomUserService,
        },
      ],
    }).compile();

    chatRoomService = module.get<ChatRoomService>(ChatRoomService);
    model = module.get<Model<Chatroom>>(getModelToken(Chatroom.name));
    chatRoomUserModel = module.get<Model<ChatRoomUser>>(
      getModelToken(ChatRoomUser.name),
    );
  });

  it('should be defined', () => {
    // expect(model).toBeDefined();
    expect(chatRoomService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of chatrooms', async () => {
      jest
        .spyOn(model, 'aggregate')
        .mockImplementationOnce(jest.fn().mockResolvedValue([mockChatRoom]));

      const result = await chatRoomService.findAll();

      expect(model.aggregate).toHaveBeenCalledWith(mockQuery);
      expect(result).toEqual([mockChatRoom]);
    });
  });

  describe('create', () => {
    it('should create and return a chatroom', async () => {
      const newChatRoom = {
        title: 'test',
        lastContents: 'hi',
      };
      jest
        .spyOn<any, string>(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockChatRoom));

      const result = await chatRoomService.create(
        newChatRoom as CreateChatRoomDto,
      );

      expect(result).toEqual(mockChatRoom);
    });
  });
});
