import { Knex } from 'knex';

const table_name = 'balance';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table_name, table => {
    table.string('id', 25).primary();
    table.string('account_id', 25).references('id').inTable('account').notNullable();
    table.string('parent_id', 25).references('id').inTable(table_name);

    table.decimal('available_amount', 11, 2).notNullable();
    table.decimal('blocked_amount', 11, 2).notNullable();

    table.dateTime('updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table_name);
}
