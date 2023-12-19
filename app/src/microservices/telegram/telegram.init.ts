import { Injectable, OnModuleInit } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramInit implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly telegramService: TelegramService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.telegramService.bot.deleteWebHook();
    await this.telegramService.bot.setWebHook(`${this.configService.get<string>('url')}/webhook`);
  }
}