/* eslint-disable no-mixed-spaces-and-tabs */
import knex from 'knex'
import config from '../../knexfile'
import { makeError } from '../middlewares/errorHandler'

const db = knex(config)

async function findUserByEmail(email: string) {

	const user = await db('users').where('email', email).first()
	return user

}

async function createUser(
	email: string,
	password: string,
	account_type: string
  
) {

	try {

		const user = await db('users').insert({
			email,
			password,
			account_type,

		})

		return user

	} catch (error) {

		console.error(error)

	}
  
}

async function updateUser(email: string, token: string): Promise<void> {
	try {
	  await db('users')
			.update({
		  token
			})
			.where({ email })
	} catch (error) {
	  throw makeError({ message: 'Erro ao criar usuário', status: 500 })
	}
}
  
async function updateUserPassword(
	email: string,
	password: string
): Promise<void> {
	try {
	  await db('users')
			.update({
		  password,
		  token: null
			})
			.where({ email })
	} catch (error) {
	  throw makeError({ message: 'Erro ao atualizar senha', status: 500 })
	}
}

export default { createUser, findUserByEmail, updateUser, updateUserPassword }
