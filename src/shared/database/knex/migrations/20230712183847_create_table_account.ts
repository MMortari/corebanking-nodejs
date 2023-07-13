import { Knex } from 'knex';

const table_name = 'account';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table_name, table => {
    table.string('id', 25).primary();
    table.string('holder_id', 25).references('id').inTable('client').notNullable();

    table.string('branch_number', 4).notNullable();
    table.string('account_number', 25).notNullable().index();
    table.string('status', 50).notNullable();

    table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable();
    table.dateTime('updated_at');

    table.unique(['branch_number', 'account_number']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table_name);
}
