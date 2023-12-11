// migrations/20231210120000_create_tables.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_job_demands', function (table) {
    table.increments().primary().notNullable();
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.integer('job_demand_id').unsigned().references('id').inTable('job_demands');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_job_demands');
}
