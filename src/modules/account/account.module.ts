import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './repositories/account.repository';
import { TransactionRepository } from '../transaction/repositories/transaction.repository';

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, TransactionRepository],
})
export class AccountModule {}
