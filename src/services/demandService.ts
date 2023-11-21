/* eslint-disable no-useless-catch */
import { makeError } from '../middlewares/errorHandler'
import authRepository from '../repositories/authRepository'
import demandRepository from '../repositories/demandRepository'

interface FieldsToUpdate {
	title?: string;
	description?: string;
	skills?: string;
	invoice?: boolean;
	link?: string;
	dead_line?: Date | null;
	demand_id?: number | null;
  }

async function validateContractor(email: string){
	const user = await authRepository.findUserByEmail(email)
	return user.contractor
}


async function createDemand(
	title: string,
	description: string,
	skills: string,
	invoice: boolean,
	link: string,
	dead_line: Date,
	email: string,
	price: string,
	phone: string
){
	const accountType = validateContractor(email)
	if (!accountType) {
		throw makeError({
			message: 'Somente usuários do tipo "contractor" podem criar demandas.',
			status: 403
		})
	}
	demandRepository.createDemand(title, description, skills, invoice, link, dead_line, price, phone)
    
}

async function showDemand(){
	const demands = demandRepository.showDemand()
	return demands
}

async function showDemandById(id: number) {
	try {
		const demand = await demandRepository.showDemandById(id)
		return demand
	} catch (error) {
		throw error
	}
}

async function updateDemand(id: number, fieldsToUpdate: FieldsToUpdate) {
	try {
		await demandRepository.updateDemand(id, fieldsToUpdate)
	}catch (error) {
		throw error
	}
}

async function removeDemand(id: number) {
	try {
		const deletedDemand = await demandRepository.removeDemand(id)
		return deletedDemand
	} catch (error) {
		throw error
	}
}
  
export default { createDemand, showDemand, updateDemand, showDemandById, removeDemand }