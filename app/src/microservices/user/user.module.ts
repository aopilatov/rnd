import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserProcessor } from './user.processor';
import { TelegramModule } from '../telegram';
import { UserDbRepository } from '../../db/repository';
import { UserDbModel } from '../../db/model';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'user' }),
    TypeOrmModule.forFeature([UserDbModel]),
    TelegramModule,
  ],
  controllers: [UserController],
  providers: [UserProcessor, UserDbRepository],
})
export class UserModule {}