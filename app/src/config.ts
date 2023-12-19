import { DataSource } from 'typeorm';
import * as path from 'node:path';

const config = {
  env: process.env.NODE_ENV || 'dev',
  url: process.env.APP_URL || '',

  db: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER || 'mvp_user',
    pass: process.env.POSTGRES_PASSWORD || 'mvp_pass',
    name: process.env.POSTGRES_DB || 'mvp',
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },

  telegram: {
    bot: process.env.TELEGRAM_BOT_TOKEN || '',
  },
};

export default () => config;

export const connectionSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.pass,
  database: config.db.name,
  migrations: [path.join(__dirname, 'db', 'migration', '**', '*.js')],
});