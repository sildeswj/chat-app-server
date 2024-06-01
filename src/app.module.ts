import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { ChatHistoryModule } from './chat-history/chat-history.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ChatGateWay } from './socket/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI, {
      dbName: process.env.DB_NAME,
    }),
    ChatRoomModule,
    ChatHistoryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateWay],
})
export class AppModule {}
