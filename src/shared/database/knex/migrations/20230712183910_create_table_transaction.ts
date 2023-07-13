import { Knex } from 'knex';

const table_name = 'transaction';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table_name, table => {
    table.string('id', 25).primary();
    table.string('account_id', 25).references('id').inTable('account').notNullable();

    table.decimal('amount', 11, 2).notNullable();
    table.string('authentication_code', 64);
    table.string('channel', 64).notNullable();

    table.decimal('balance_before', 11, 2).notNullable();
    table.decimal('balance_after', 11, 2).notNullable();

    table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable();
    table.dateTime('updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table_name);
}
