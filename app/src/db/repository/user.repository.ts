import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDbModel } from '../model';

@Injectable()
export class UserDbRepository {
  constructor(
    @InjectRepository(UserDbModel)
    private readonly repository: Repository<UserDbModel>,
  ) {}

  private getBaseQuery() {
    return this.repository
      .createQueryBuilder('user');
  }

  public async findByUuid(uuid: string): Promise<UserDbModel> {
    return this.getBaseQuery()
      .andWhere('user.uuid = :uuid', { uuid })
      .getOne();
  }

  public async findByChatAndUserId(chatId: number, userId: number): Promise<UserDbModel> {
    return this.getBaseQuery()
      .andWhere('user.chatId = :chatId', { chatId })
      .andWhere('user.userId = :userId', { userId })
      .getOne();
  }

  public async create(chatId: number, userId: number, firstName: string): Promise<UserDbModel> {
    const user = await this.repository.create({ chatId, userId, firstName });
    return this.repository.save(user);
  }
}