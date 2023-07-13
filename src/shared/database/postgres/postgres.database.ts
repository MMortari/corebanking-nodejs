import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

import { Account } from 'src/modules/account/entities/account.entity';
import { Client } from 'src/modules/client/entities/client.entity';
import { Balance } from 'src/modules/balance/entities/balance.entity';

interface Database {
  account: Account;
  client: Client;
  balance: Balance;
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: 'localhost',
      port: 5432,
      database: 'core',
      password: 'docker',
      user: 'postgres',
    }),
  }),
});
