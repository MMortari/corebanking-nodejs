import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateDepositRequest } from './dtos/create-deposit.dto';
import { CreatePerToPerRequest } from './dtos/create-p2p.dto';
import { TransactionService } from './transaction.service';

@ApiTags('Transaction')
@Controller('/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/withdraw')
  createWithdraw(@Body() data: CreateDepositRequest) {
    return this.transactionService.createWithdraw(data);
  }

  @Post('/deposit')
  createDeposit(@Body() data: CreateDepositRequest) {
    return this.transactionService.createDeposit(data);
  }

  @Post('/p2p')
  createP2p(@Body() data: CreatePerToPerRequest) {
    return this.transactionService.createP2p(data);
  }

  @Get('/:id')
  getTransactionDetails() {
    return 'getTransactionDetails';
  }

  @Get('/')
  listTransactions() {
    return this.transactionService.list();
  }
}
