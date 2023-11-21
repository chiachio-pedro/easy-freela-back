import { Request, Response } from 'express'

export type ErrorType = {

  message: string;
  status: number;
  stack?: string;

};

export const errorHandler = (

	error: ErrorType,
	req: Request,
	res: Response,

) => {

	const status = error.status ? error.status : 500
	const errorResponse = {

		message: error.message ? error.message : 'Internal server error',
		stack: error.stack,

	}

	res.status(status).json(errorResponse)
}

export const makeError = ({ message, status }: ErrorType) => {

	return {

		message,
		status,

	}
}
