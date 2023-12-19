import { Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { TelegramService } from '../telegram';
import { UserDbRepository } from '../../db/repository';
import * as _ from 'lodash';

@Processor('user')
export class UserProcessor {
  constructor(
    private readonly configService: ConfigService,
    private readonly telegramService: TelegramService,
    private readonly userDbRepository: UserDbRepository,
  ) {}

  @Process('start')
  public async start(job: Job<any>): Promise<void> {
    const chatId = parseInt(_.get(job, 'data.chat.id', ''));
    const userId = parseInt(_.get(job, 'data.from.id', ''));
    const firstName = _.get(job, 'data.chat.first_name', '');

    let userModel = await this.userDbRepository.findByChatAndUserId(chatId, userId);
    if (!userModel) userModel = await this.userDbRepository.create(chatId, userId, firstName);

    await this.telegramService.bot.sendMessage(chatId, `Hello, ${firstName}!`, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Who am I?',
              web_app: {
                url: `${this.configService.get<string>('url')}/user/self/${userModel.uuid}`,
              },
            },
          ]
        ],
      },
    });
  }

  @Process('adminMessage')
  public async adminMessage(job: Job<any>): Promise<void> {
    const chatId = parseInt(_.get(job, 'data.chat.id', ''));
    const userId = parseInt(_.get(job, 'data.from.id', ''));

    if (!job.data?.toUserId) return;
    if (!job.data?.toMsg) return;
    job.data.toUserId = parseInt(job.data.toUserId);

    const adminModel = await this.userDbRepository.findByChatAndUserId(chatId, userId);
    if (!adminModel && !adminModel?.isAdmin) return;

    const userDbModel = await this.userDbRepository.findByChatAndUserId(job.data.toUserId, job.data.toUserId);
    if (!userDbModel) return;

    await this.telegramService.bot.sendMessage(job.data.toUserId, job.data.toMsg);
  }

  @Process('self')
  public async getSelf(job: Job<any>): Promise<string> {
    if (!job.data?.uuid) return null;
    const userModel = await this.userDbRepository.findByUuid(job.data.uuid);
    if (!userModel) return null;

    return `<html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Myself - ${userModel.firstName}</title>
        </head>
        <body>
            Hello, ${userModel.firstName}!
        </body>
    </html>`;
  }
}