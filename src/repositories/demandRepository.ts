import knex from 'knex'
import config from '../../knexfile'
import { FieldsToUpdate } from '../types/demandTypes'

const db = knex(config)

async function createDemand(
	title: string,
	description: string,
	//skills: string,
	//invoice: boolean,
	//link: string,
	email: string,
	dead_line: Date,
	price: string,
	phone: string,
	user_id: number
) {
	try {
		await db('job_demands').insert({
			title,
			description,
			//skills,
			//invoice,
			//link,
			dead_line,
			price,
			phone,
			user_id
		})
	} catch (error) {
		console.error(error)
	}
}

async function associationDemand(
	user_id: number,
	job_demand_id: number
) {
	try {
		await db('user_job_demands').insert({
			user_id,
			job_demand_id
		})
	} catch (error) {
		console.error(error)
	}
}

async function getUserType(email: string) {
	try {
		db('users').where('account_type', email).first()
	} catch (error) {
		console.error(error)
	}
}

async function showDemand() {
	try {
		const demands = await db('job_demands').select('*')
		return demands
	} catch (error) {
		console.error(error)
	}
}

async function showDemandById(id: number) {
	// eslint-disable-next-line no-useless-catch
	try {
		const demand = await db('job_demands').where('id', id).first()
		return demand
	} catch (error) {
		throw error
	}
}

async function showDemandByUserId(id: number) {
	// eslint-disable-next-line no-useless-catch
	try {
		const demand = await db('job_demands').where('user_id', id)
		return demand
	} catch (error) {
		throw error
	}
}

async function showJobsById(id: number) {
	// eslint-disable-next-line no-useless-catch
	try {
		const demands = await db('job_demands')
		.select('*')
		.join('user_job_demands as ujd', 'ujd.job_demand_id', '=', 'job_demands.id')
		.where('ujd.user_id', '=', id)
		return demands
	} catch (error) {
		throw error
	}
}

async function updateDemand(id: number, fieldsToUpdate: FieldsToUpdate) {
	// eslint-disable-next-line no-useless-catch
	try {
		const updateData = {
			...fieldsToUpdate,
		}
		await db('job_demands').where('id', id).update(updateData)
	} catch (error) {
		throw error
	}
}

async function removeDemand(id: number) {
	// eslint-disable-next-line no-useless-catch
	try {
		const deletedDemand = await db('job_demands').where('id', id).del()
		return deletedDemand === 1 
	} catch (error) {
		throw error
	}
}

export default { createDemand, getUserType, showDemand, updateDemand, showDemandById, removeDemand, associationDemand, showJobsById, showDemandByUserId}
