import type { Knex } from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()

const config: Knex.Config = {
	client: 'pg',
	connection: {
		host: process.env.HOST,
		user: 'postgres',
		password: process.env.DATABASE_PASSWORD,
		database: 'postgres', 
		port: 5432, 
	},
	migrations: {
		tableName: 'knex_migrations',
		directory: './src/database'
	},
	seeds: {
		directory: './src/seeds'
	}
}

export default config