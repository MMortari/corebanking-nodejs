import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountRequest } from './dtos/create-account.dto';
import { generateId } from '../../shared/utils/id.util';
import { AccountRepository } from './repositories/account.repository';
import { Account } from './entities/account.entity';
import { generateAccountNumber } from 'src/shared/utils/account-number.util';
import { GetInfoByIdResponse } from './dtos/get-info-by-id.dto';
import { TransactionRepository } from '../transaction/repositories/transaction.repository';
import { Transaction } from '../transaction/entities/transaction.entity';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository, private transactionRepository: TransactionRepository) {}

  async list(): Promise<Account[]> {
    return this.accountRepository.list();
  }
  async getInfoById(id: string): Promise<GetInfoByIdResponse> {
    const account = await this.accountRepository.getById(id);

    if (!account) {
      throw new NotFoundException('Account with id not found');
    }

    const balance = await this.accountRepository.getBalanceByIdAccount(id);

    return {
      ...account,
      balance: {
        available_amount: balance.available_amount,
        blocked_amount: balance.blocked_amount,
      },
    };
  }

  async getAccountTransactions(id: string): Promise<Transaction[]> {
    const account = await this.accountRepository.getById(id);

    if (!account) {
      throw new NotFoundException('Account with id not found');
    }

    const transaction = await this.transactionRepository.listFromAccount(id);

    return transaction;
  }

  async create(data: CreateAccountRequest) {
    const id = generateId('account');
    const account_number = generateAccountNumber();

    const account: Account = {
      id,
      status: data.status,
      holder_id: data.holder_id,
      branch_number: data.branch_number,
      account_number,
      created_at: new Date(),
    };

    const insert = await this.accountRepository.create(account);

    return insert;
  }
}
