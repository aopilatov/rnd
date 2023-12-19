import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1702931975000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      
      CREATE TABLE IF NOT EXISTS public."user" (
        "uuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "chat_id" INT8 NOT NULL,
        "user_id" INT8 NOT NULL,
        "first_name" TEXT NOT NULL,
        "is_admin" BOOLEAN DEFAULT false
      );
      
      CREATE INDEX IF NOT EXISTS idx_user_chat_id ON public."user" USING hash (chat_id);
      CREATE INDEX IF NOT EXISTS idx_user_user_id ON public."user" USING hash (user_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS public."user";');
  }

}