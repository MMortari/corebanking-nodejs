import type { Knex } from 'knex';
import { resolve } from 'path';

import { database_config } from './src/config/knex.config';

export const migration_directory = resolve('src', 'shared', 'database', 'knex', 'migrations');
export const seed_directory = resolve('src', 'shared', 'database', 'knex', 'seeds');

const config: { [key: string]: Knex.Config } = {
  development: {
    ...database_config,
    migrations: {
      tableName: 'knex_migrations',
      directory: migration_directory,
    },
    seeds: {
      directory: seed_directory,
    },
  },
  test: {
    ...database_config,
    migrations: {
      tableName: 'knex_migrations',
      directory: migration_directory,
    },
    seeds: {
      directory: seed_directory,
    },
  },
  production: {
    ...database_config,
    migrations: {
      tableName: 'knex_migrations',
      directory: migration_directory,
    },
    seeds: {
      directory: seed_directory,
    },
  },
};

module.exports = config;
