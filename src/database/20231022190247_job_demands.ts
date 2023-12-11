import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('job_demands', function (table) {
		table.increments().primary().notNullable()
		table.string('title').notNullable()
		table.string('description').notNullable()
		//table.string('skills')
		//table.boolean('invoice').notNullable()
		//table.string('link')
		table.date('dead_line')
		table.string('price').notNullable()
		table.string('phone').notNullable()
		table.integer('user_id').notNullable
		table.foreign('user_id').references('users.id')
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('job_demands')
}
