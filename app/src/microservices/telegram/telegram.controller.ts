import { Controller, Post, Req } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { FastifyRequest } from 'fastify';
import * as _ from 'lodash';

@Controller('/webhook')
export class TelegramController {
  constructor(
    @InjectQueue('user') private readonly userQueue: Queue,
  ) {}

  @Post()
  public async webhook(@Req() req: FastifyRequest): Promise<string> {
    const message = _.get(req, 'body.message.text', _.get(req, 'body.message.edited_text', '')).toString();
    if (_.get(req, 'body.message.chat') && message.length) {
      req.log.info('Received webhook', message);
      const data = _.get(req, 'body.message', {});
      if (message.toLowerCase().startsWith('/start')) {
        await this.userQueue.add('start', data);
      } else if (message.startsWith('/adminhello')) {
        const [ cmd, toUserId, ...msgs ] = _.get(req, 'body.message.text', '').split(' ');
        await this.userQueue.add('adminMessage', { toUserId, toMsg: msgs.join(' '), ...data });
      } else {
        req.log.warn('Unknown cmd');
      }
    }

    return 'webhook';
  }
}