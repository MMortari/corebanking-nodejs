import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateAccountRequest } from './dtos/create-account.dto';
import { AccountService } from './account.service';
import { GetInfoByIdRequest } from './dtos/get-info-by-id.dto';

@ApiTags('Account')
@Controller('/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('')
  create(@Body() data: CreateAccountRequest) {
    return this.accountService.create(data);
  }

  @Get('')
  list() {
    return this.accountService.list();
  }

  @Get('/:id')
  getInfo(@Param() { id }: GetInfoByIdRequest) {
    return this.accountService.getInfoById(id);
  }

  @Get('/:id/transactions')
  getAccountTransactions(@Param() { id }: GetInfoByIdRequest) {
    return this.accountService.getAccountTransactions(id);
  }
}
