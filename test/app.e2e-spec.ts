import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';

describe('Chat Room (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    mongoose
      .connect(process.env.DB_URI, { dbName: process.env.DB_NAME })
      .catch((error) => console.error('mongoose connection error: ', error));
  });

  afterAll(() => mongoose.disconnect());

  const mockChatRoom = {
    userId: '61c0ccf11d7bf83d153d7c06',
    title: 'Welcome to J World',
  };

  const newUser = {
    userName: 'Jay',
  };

  let testUser;

  describe('user', () => {
    it('(GET) - Find or Create new user', async () => {
      return request(app.getHttpServer())
        .get(`/user/find-one-or-create?userName=${newUser.userName}`)
        .expect(200)
        .then((res) => {
          expect(res.body.userName);
          testUser = res.body;
        });
    });
  });

  describe('chat-room', () => {
    it('(POST) - Create new chatroom', async () => {
      return request(app.getHttpServer())
        .post('/chat-room')
        .send({ ...mockChatRoom, userId: testUser._id })
        .expect(201)
        .then((res) => {
          expect(res.body.roomId);
        });
    });
  });
});
