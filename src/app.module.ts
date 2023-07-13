import { Module } from '@nestjs/common';

import { TransactionModule } from './modules/transaction/transaction.module';
import { Database } from './shared/database/knex/knex.database';
import { AccountModule } from './modules/account/account.module';
import { BalanceModule } from './modules/balance/balance.module';
import { ClientModule } from './modules/client/client.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ClientModule, AccountModule, BalanceModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private knexDatabase: KnexDatabase) {}

  async onApplicationBootstrap() {
    await Database.connect();
  }
  async onApplicationShutdown() {
    await Database.disconnect();
  }
}
