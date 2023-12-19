import { Controller, Get, Req, Res, Headers } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('/user')
export class UserController {
  constructor(
    @InjectQueue('user') private readonly userQueue: Queue,
  ) {}

  @Get('/self/:uuid')
  public async getSelf(@Req() req: FastifyRequest, @Res() res: FastifyReply, @Headers() headers: Record<string, any>): Promise<string> {
    const job = await this.userQueue.add('self', req?.params || {});
    const result = await job.finished();
    return res.code(200)
      .header('Content-Type', 'text/html')
      .send(result);
  }
}