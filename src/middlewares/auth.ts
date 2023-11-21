import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { makeError } from './errorHandler'

export const SECRET_KEY: Secret = String(process.env.SECRET_KEY)

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header('Authorization')?.replace('Bearer ', '')

		if (!token) {
			throw makeError({message: 'Por favor, faça login', status: 401})
		}

		const decoded = jwt.verify(token, SECRET_KEY);
		(req as CustomRequest).token = decoded

		next()
	} catch (err) {
		res.send(err)
	}
}
