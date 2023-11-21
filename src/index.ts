import express, { Application } from 'express'
import authRoutes from './routes/authRoute'
import demandRoute from './routes/demandRoute'
import { auth } from './middlewares/auth'
import * as dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app: Application = express()
app.use(cors({ origin: '*' }))

app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes)
app.use(auth)
app.use('/demand', demandRoute)

const port = process.env.PORT || 8080

app.listen(port, () => {

	console.log(`Servidor rodando na porta ${port}`)  
})
