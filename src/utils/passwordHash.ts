import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
dotenv.config()

const saltRounds = Number(process.env.SALT_ROUNDS)
export async function generatePassword(password: string) {

	const passwordHash = await bcrypt.hash(password, saltRounds)
	return passwordHash

}

async function validateUser(

	password: string,
	hash: string

): Promise<boolean | undefined> {

	try {

		const isValid = await bcrypt.compare(password, hash)
		return isValid

	} catch (error) {

		console.error((error as Error).message)

	}
}
export default {

	generatePassword,
	validateUser
  
}
