import { Request, Response } from 'express'
import demandService from '../services/demandService'

async function createDemand(req: Request, res: Response){
	try{
		const {title, description, skills, invoice, link, dead_line, email, price, phone} = req.body
		await demandService.createDemand(title, description, skills, invoice, link, dead_line, email, price, phone)
		res
			.status(200)
			.json({ message: 'Demanda cadastrada com sucesso' })

	}catch(error){
		res.status(400).json({ error })
	}
}

async function showDemand(req: Request, res: Response) {
	try {
		const demands = await demandService.showDemand()
		res.status(200).json({ message: 'Lista de demandas', data: demands })
	} catch (error) {
		res.status(400).json({ error: error })
	}
}

async function showDemandById(req: Request, res: Response) {
	try {
		const id = parseInt(req.params.id, 10)
		const demand = await demandService.showDemandById(id)
		if (demand) {
			res.status(200).json({ message: 'Demanda encontrada:', demand })
		} else {
			res.status(404).json({ message: 'Demanda não encontrada' })
		}
	} catch (error) {
		res.status(400).json({ error })
	}
}

async function updateDemand(req: Request, res: Response) {
	try {
		const id = parseInt(req.params.id, 10)
		const fieldsToUpdate = req.body

		await demandService.updateDemand(id, fieldsToUpdate)
		res.status(200).json({ message: 'Demanda atualizada com sucesso' })
	} catch (error) {
		res.status(400).json({ error })
	}
}


async function removeDemand(req: Request, res: Response) {
	try {
		const id = parseInt(req.params.id, 10)
		const deletedDemand = await demandService.removeDemand(id)
		if (deletedDemand) {
			res.status(200).json({ message: 'Demanda removida com sucesso' })
		} else {
			res.status(404).json({ message: 'Demanda não encontrada' })
		}
	} catch (error) {
		res.status(400).json({ error })
	}
}
  

export default { createDemand, showDemand, updateDemand, showDemandById, removeDemand}