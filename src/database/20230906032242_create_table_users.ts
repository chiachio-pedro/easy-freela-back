import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {

	await knex.schema.createTable('users', function (table) {

		table.increments().primary().notNullable()
		table.string('name').notNullable()
		table.string('email').notNullable()
		table.string('password').nullable()
		table.string('account_type').notNullable()

	})

}
  
export async function down(knex: Knex): Promise<void> {

	await knex.schema.dropTable('users')
  
}
