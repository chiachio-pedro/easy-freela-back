
import { Request, Response } from 'express'
import demandService from '../services/demandService'
import { UserData } from '../types/demandTypes'

interface CustomRequest extends Request  {
	token: {
		userId: number;
		accountType: string
	}
}

async function createDemand(req: Request, res: Response) {
	try {
		const { title, description, dead_line, email, price, phone, user_id } = req.body
		await demandService.createDemand(title, description, dead_line, email, price, phone, user_id)
		res
			.status(200)
			.json({ message: 'Demanda cadastrada com sucesso' })

	} catch (error) {
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

async function showDemandByUserId(req: CustomRequest, res: Response) {
	try {
		const demand = await demandService.showDemandByUserId(req.token.userId)
		if (demand) {
			res.status(200).json({ message: 'Demanda encontrada:', data: demand })
		} else {
			res.status(404).json({ message: 'Demanda não encontrada' })
		}
	} catch (error) {
		res.status(400).json({ error })
	}
}

async function showJobsById(req: CustomRequest, res: Response) {
	try {
		const demands = await demandService.showJobsById(Number(req.token.userId))
		if (demands) {
			res.status(200).json({ message: 'Lista de Projetos', data: demands })
		} else {
			res.status(404).json({ message: 'Nehnum projeto encontrado' })
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

async function setFreelaDemand(req: Request, res: Response) {
	try {
		const { user_id, job_demand_id} = req.body
		await demandService.setFreelaDemand(user_id, job_demand_id);
		res.status(200).json({ message: 'Adicionado com sucesso' })
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

function validateData(userData: UserData) {
	const {
		name,
		aboutMe,
		email,
		phone,
		portfolioLink,
		linkedInLink,
		gitHubLink,
		contractorEmail,
	} = userData

	if (!name || !aboutMe || !email || !phone || !portfolioLink || !linkedInLink || !gitHubLink || !contractorEmail) {
		throw new Error('Todos os campos são obrigatórios')
	}

	return userData
}

export async function registerOnDemand(req: Request, res: Response) {
	try {
		const userData = validateData(req.body)

		await demandService.registerOnDemand(
			userData
		)

		res.status(200).json({ message: 'Applying successfully' })
	} catch (error) {
		res.status(500).json({
			message: (error as Error).message || 'An error occurred during to apply on demand',
		})
	}
}



function userDemands(req: Request, res: Response){
	const customReq = req as CustomRequest;
	if(typeof customReq.token === 'string'){
		throw new Error("Bad token parsing")
	} 
	if (customReq.token.accountType === 'Contratante'){
		return showDemandByUserId(customReq, res);
	}else {
		return showJobsById(customReq, res)
	}
}

export default { createDemand, showDemand, updateDemand, showDemandById, removeDemand, registerOnDemand, setFreelaDemand, showJobsById, showDemandByUserId, userDemands}