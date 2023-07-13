import KnexInstance, { Knex } from 'knex';
import * as Postgres from 'pg';

import { database_config } from '../../../config/knex.config';
import { randomUUID } from 'crypto';

// @Injectable({ scope: Scope.DEFAULT })
class KnexDatabase {
  id: string;
  private _db: Knex;

  constructor() {
    this.id = randomUUID();
    console.log('KnexDatabase constructor', this.id);
  }

  get connection() {
    if (!this._db) throw new Error('Database not initialized');

    return this._db;
  }

  query<T = any>(table: string) {
    return this._db<T>(table);
  }

  async connect() {
    const database_configs = {
      ...database_config,
      pool: {
        min: 20,
        max: 300,
        idleTimeoutMillis: 30000, // 30 segundos
      },
    };

    this._db = KnexInstance(database_configs);

    Postgres.types.setTypeParser(Postgres.types.builtins.INT8, (value: any) => {
      return parseInt(value, 10);
    });

    Postgres.types.setTypeParser(Postgres.types.builtins.FLOAT8, (value: any) => {
      return parseFloat(value);
    });

    Postgres.types.setTypeParser(Postgres.types.builtins.NUMERIC, (value: any) => {
      return parseFloat(value);
    });

    try {
      await this._db.raw('select 1+1 as result');

      console.log('✔️ Postgres Database | Connected', this.id);
    } catch (err: any) {
      console.log('❌ Postgres Database | Error to connect:', err.message, 'error');

      throw err;
    }
  }
  async disconnect() {
    await this._db.destroy();

    console.log('✔️ Postgres Database | Disconnected');
  }
}

export const Database = new KnexDatabase();

// export default new KnexDatabase();
