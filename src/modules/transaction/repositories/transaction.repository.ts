import { Injectable } from '@nestjs/common';

import { Database } from '../../../shared/database/knex/knex.database';
import { Balance } from '../../../modules/balance/entities/balance.entity';
import { EnumTransactionChannel, Transaction } from '../entities/transaction.entity';
import { CreatePerToPerRequest } from '../dtos/create-p2p.dto';
import { generateId } from 'src/shared/utils/id.util';

@Injectable()
export class TransactionRepository {
  // Get
  async list(): Promise<Transaction[]> {
    const list = await Database.query('transaction').select('*').orderBy('created_at', 'desc');

    return list;
  }
  async listFromAccount(account_id: string): Promise<Transaction[]> {
    const list = await Database.query<Transaction>('transaction').select('*').where('account_id', account_id).orderBy('created_at', 'desc');

    return list;
  }

  // Insert
  async createDeposit(data: CreateTransaction): Promise<Transaction> {
    const transaction = await Database.connection.transaction();

    try {
      // console.log('Start lock');

      const balance_before = await Database.query<Balance>('balance')
        .select('available_amount')
        .where('account_id', data.account_id)
        .forUpdate()
        .transacting(transaction)
        .first();

      const [balance_after] = await Database.query<Balance>('balance')
        .increment('available_amount', data.amount)
        .where('account_id', data.account_id)
        .returning('available_amount')
        .transacting(transaction);

      // await sleep(10);

      const new_transaction = await Database.query<Transaction>('transaction')
        .insert({
          ...data,
          balance_before: balance_before.available_amount,
          balance_after: balance_after.available_amount,
        })
        .transacting(transaction)
        .returning('*');

      await transaction.commit();

      // console.log('Lock free');

      return new_transaction[0];
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }
  async createWithdraw(data: CreateTransaction): Promise<Transaction> {
    const transaction = await Database.connection.transaction();

    try {
      const balance_before = await Database.query<Balance>('balance')
        .select('available_amount')
        .where('account_id', data.account_id)
        .forUpdate()
        .transacting(transaction)
        .first();

      const [balance_after] = await Database.query<Balance>('balance')
        .decrement('available_amount', data.amount)
        .where('account_id', data.account_id)
        .returning('available_amount')
        .transacting(transaction);

      const new_transaction = await Database.query<Transaction>('transaction')
        .insert({
          ...data,
          amount: data.amount * -1,
          balance_before: balance_before.available_amount,
          balance_after: balance_after.available_amount,
        })
        .transacting(transaction)
        .returning('*');

      await transaction.commit();

      return new_transaction[0];
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }
  async createPerToPer(data: CreatePerToPerRequest): Promise<Transaction> {
    const transaction = await Database.connection.transaction();

    try {
      // Block balances on database
      const origin_balance_before = await Database.query<Balance>('balance')
        .select('available_amount')
        .where('account_id', data.origin_account_id)
        .forUpdate()
        .transacting(transaction)
        .first();
      const destination_balance_before = await Database.query<Balance>('balance')
        .select('available_amount')
        .where('account_id', data.destination_account_id)
        .forUpdate()
        .transacting(transaction)
        .first();

      // Updating balances
      const [origin_balance_after] = await Database.query<Balance>('balance')
        .decrement('available_amount', data.amount)
        .where('account_id', data.origin_account_id)
        .returning('available_amount')
        .transacting(transaction);
      const [destination_balance_after] = await Database.query<Balance>('balance')
        .increment('available_amount', data.amount)
        .where('account_id', data.destination_account_id)
        .returning('available_amount')
        .transacting(transaction);

      // Adding transactions
      const authentication_code = data.authentication_code || generateId();

      const origin_transaction = await Database.query<Transaction>('transaction')
        .insert({
          id: generateId('transaction'),
          account_id: data.origin_account_id,
          amount: data.amount * -1,
          authentication_code,
          balance_before: origin_balance_before.available_amount,
          balance_after: origin_balance_after.available_amount,
          channel: EnumTransactionChannel.P2P,
        })
        .transacting(transaction)
        .returning('*');
      await Database.query<Transaction>('transaction')
        .insert({
          id: generateId('transaction'),
          account_id: data.destination_account_id,
          amount: data.amount,
          authentication_code,
          balance_before: destination_balance_before.available_amount,
          balance_after: destination_balance_after.available_amount,
          channel: EnumTransactionChannel.P2P,
        })
        .transacting(transaction);

      await transaction.commit();

      return origin_transaction[0];
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }
}

export type CreateTransaction = Omit<Transaction, 'created_at' | 'balance_before' | 'balance_after'>;

// const sleep = (seconds: number) => new Promise(res => setTimeout(() => res(null), seconds * 1000));
