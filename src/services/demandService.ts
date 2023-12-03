/* eslint-disable no-useless-catch */
import { makeError } from '../middlewares/errorHandler'
import authRepository from '../repositories/authRepository'
import demandRepository from '../repositories/demandRepository'
import nodemailer from 'nodemailer'
import { FieldsToUpdate, UserData } from '../types/demandTypes'



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

async function registerOnDemand(userData: UserData) {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: String(process.env.USER_EMAIL),
				pass: String(process.env.PASS),
			},
		})
		const emailContent = `
		<h3>&#128513; Olá, sua demanda obteve mais uma candidatura:</h3>
		<p>Nome: ${userData.name}</p>
		<p>Sobre o profissional: ${userData.aboutMe}</p>
		<p>Email: ${userData.email}</p>
		<p>Telefone: ${userData.phone}</p>
		<p>Portfolio: ${userData.portfolioLink}</p>
		<p>LinkedIn: ${userData.linkedInLink}</p>
		<p>GitHub: ${userData.gitHubLink}</p>
	`

		await transporter.sendMail({
			from: String(process.env.USER_EMAIL),
			to: userData.contractorEmail,
			subject: 'Aplicação de novo usuário em sua demanda',
			html: emailContent,
		})
	} catch (error) {
		throw makeError({
			message: 'Error to apply on demand',
			status: 500,
		})
	}
}
export default { createDemand, showDemand, updateDemand, showDemandById, removeDemand, registerOnDemand }