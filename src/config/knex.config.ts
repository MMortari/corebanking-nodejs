import { Knex } from 'knex';

export const database_config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'docker',
    database: process.env.DB_NAME || 'core',
    // schema: 'public',
  },
  debug: true,
  log: {
    debug: message => console.log('debug', message),
    deprecate: message => console.log('deprecate', message),
    error: message => console.log('error', message),
    warn: message => console.log('warn', message),
  },
};
