import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramInit } from './telegram.init';
import { TelegramController } from './telegram.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'user' })],
  providers: [TelegramService, TelegramInit],
  controllers: [TelegramController],
  exports: [TelegramService],
})
export class TelegramModule {}