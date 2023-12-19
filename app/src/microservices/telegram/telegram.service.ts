import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  public readonly bot!: TelegramBot;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.bot = new TelegramBot(this.configService.get<string>('telegram.bot'), {
      polling: false,
    });
  }
}