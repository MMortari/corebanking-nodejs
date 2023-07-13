import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';

import { CreateDepositRequest } from './dtos/create-deposit.dto';
import { TransactionRepository } from './repositories/transaction.repository';
import { generateId } from 'src/shared/utils/id.util';
import { AccountRepository } from '../account/repositories/account.repository';
import { CreatePerToPerRequest } from './dtos/create-p2p.dto';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository, private accountRepository: AccountRepository) {}

  async list() {
    const list = await this.transactionRepository.list();

    return list;
  }

  async createWithdraw(data: CreateDepositRequest) {
    const id = generateId('transaction');

    const balance = await this.accountRepository.getBalanceByIdAccount(data.account_id);

    if (balance.available_amount < data.amount) {
      throw new NotAcceptableException('Unavailable amount requested');
    }

    const withdraw = await this.transactionRepository.createWithdraw({
      id,
      account_id: data.account_id,
      amount: data.amount,
      authentication_code: data.authentication_code,
      channel: data.channel,
    });

    return withdraw;
  }

  async createDeposit(data: CreateDepositRequest) {
    const id = generateId('transaction');

    const deposit = await this.transactionRepository.createDeposit({
      id,
      account_id: data.account_id,
      amount: data.amount,
      authentication_code: data.authentication_code,
      channel: data.channel,
    });

    return deposit;
  }

  async createP2p(data: CreatePerToPerRequest) {
    const origin_account = await this.accountRepository.getByIdToValidate(data.origin_account_id);

    if (!origin_account) {
      throw new NotFoundException('Origin account not founded');
    }

    const destination_account = await this.accountRepository.getByIdToValidate(data.destination_account_id);

    if (!destination_account) {
      throw new NotFoundException('Destination account not founded');
    }

    const balance = await this.accountRepository.getBalanceByIdAccount(data.origin_account_id);

    if (balance.available_amount < data.amount) {
      throw new NotAcceptableException('Unavailable amount requested');
    }

    const deposit = await this.transactionRepository.createPerToPer({
      amount: data.amount,
      destination_account_id: data.destination_account_id,
      origin_account_id: data.origin_account_id,
      authentication_code: data.authentication_code,
    });

    return deposit;
  }
}
