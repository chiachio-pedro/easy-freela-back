import type { Knex } from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()

const config: Knex.Config = {
	client: 'pg',
	connection: {
		host: process.env.HOST,
		user: 'postgres',
		password: process.env.DATABASE_PASSWORD,
		database: 'railway', 
		port: 57592, 
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