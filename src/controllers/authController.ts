import { Request, Response } from 'express'
import authService from '../services/authService'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { makeError } from '../middlewares/errorHandler'


async function signUp(req: Request, res: Response): Promise<void> {

	try {
		const { email, password, accountType } = req.body

		await authService.signUp(email, password, accountType)
		res.status(200).json({ message: 'Cadastro efetuado com sucesso!' })
	} catch (error) {
		res.status(400).json({ error })
	}

}

async function login(req: Request, res: Response): Promise<void> {
	try {
		const { email, password } = req.body
		const session = await authService.login(email, password)
		res
			.status(200)
			.json({ session: session, message: 'Login efetuado com sucesso!' })
	} catch (error) {
		res.status(400).json({ message: (error as Error).message })
	}
}

export async function forgotPassword(req: Request, res: Response) {
	try {
		// Lógica para redefinir a senha do usuário
		const { email } = req.body
		if (!email) {
			res.status(400).json({ message: 'Email é obrigatório' })
			return
		}

		// Envio do e-mail de redefinição de senha
		await authService.sendPasswordResetEmail(email)

		res
			.status(200)
			.json({ message: 'E-mail de redefinição de senha enviado com sucesso' })
	} catch (error) {
		console.error('Erro ao redefinir a senha:', error)
		res.status(400).json({
			message:
        (error as Error).message || 'Ocorreu um erro ao redefinir a senha'
		})
	}
}

async function resetPassword(req: Request, res: Response) {
	try {
		// Lógica para redefinir a senha do usuário
		const { token } = req.query
		const { password } = req.body
		if (!password) {
			throw makeError({ message: 'Senha é obrigatória', status: 400 })
		}
		if (token) {
			// Verificando e decodificando o token para obter o email do usuário
			const decoded = jwt.verify(
				`${token}`,
				`${process.env.SECRET_KEY}`
			) as JwtPayload

			const email = decoded.userId

			// Envio do e-mail de redefinição de senha
			await authService.resetPassword(email, password)

			res.status(200).json({
				message: 'Senha atualizada com sucesso'
			})
		}
	} catch (error) {
		console.error('Erro ao redefinir a senha:', error)
		res.status(400).json({
			message:
        (error as Error).message || 'Ocorreu um erro ao redefinir a senha'
		})
	}
}

export default { signUp, login, forgotPassword, resetPassword }