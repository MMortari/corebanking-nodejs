import { Injectable } from '@nestjs/common';

import { Database } from '../../../shared/database/knex/knex.database';
import { Account } from '../entities/account.entity';
import { Balance } from '../../../modules/balance/entities/balance.entity';
import { generateId } from 'src/shared/utils/id.util';

@Injectable()
export class AccountRepository {
  // Get
  async getById(id: string): Promise<Account> {
    return Database.query('account').select('*').where('id', id).first();
  }
  async getByIdToValidate(id: string): Promise<Pick<Account, 'id'>> {
    return Database.query('account').select('id').where('id', id).first();
  }
  async list(): Promise<Account[]> {
    const list = await Database.query('account as a')
      .select('a.*', 'b.available_amount', 'b.blocked_amount')
      .join('balance as b', 'a.id', '=', 'b.account_id')
      .orderBy('a.created_at');

    return list;
  }

  async getBalanceByIdAccount(id: string): Promise<Balance> {
    return Database.query('balance').select('*').where('account_id', id).first();
  }

  // Insert
  async create(data: Account): Promise<Account> {
    const transaction = await Database.connection.transaction();

    try {
      const account = await Database.query('account').insert(data).transacting(transaction).returning('*');

      await Database.query<Balance>('balance')
        .insert({ account_id: data.id, available_amount: 0, blocked_amount: 0, id: generateId('balance') })
        .transacting(transaction);

      await transaction.commit();

      return account[0];
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }
}
