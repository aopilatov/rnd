import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastify } from 'fastify';
import { AppModule } from './app.module';
import { randomUUID } from 'node:crypto';
import * as process from 'node:process';
import * as fs from 'node:fs';
import * as path from 'node:path';

import middlewareOnRequest from './middleware/onRequest.middleware';
import middlewareOnResponse from './middleware/onResponse.middleware';

const fastifyInstance = fastify({
  disableRequestLogging: true,
  genReqId: () => randomUUID(),
  logger: { transport: { target: process.env?.NODE_ENV === 'prod' ? null : 'pino-pretty' } },
  http2: true,
  https: {
    allowHTTP1: true,
    cert: fs.readFileSync(path.join(__dirname, '..', 'cert', 'local.crt')),
    key: fs.readFileSync(path.join(__dirname, '..', 'cert', 'local.key')),
  },
});

middlewareOnRequest(fastifyInstance);
middlewareOnResponse(fastifyInstance);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(fastifyInstance), {
    cors: true,
    bufferLogs: true,
  });
  await app.listen(3000, '0.0.0.0');
}

bootstrap();
