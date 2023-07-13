import { Knex } from 'knex';

const table_name = 'client';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table_name, table => {
    table.string('id', 25).primary();

    table.string('name', 255).notNullable();
    table.string('document', 255).notNullable().index();

    table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable();
    table.dateTime('updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table_name);
}
