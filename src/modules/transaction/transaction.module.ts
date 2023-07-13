import { Module } from '@nestjs/common';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './repositories/transaction.repository';
import { AccountRepository } from '../account/repositories/account.repository';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository, AccountRepository],
})
export class TransactionModule {}
