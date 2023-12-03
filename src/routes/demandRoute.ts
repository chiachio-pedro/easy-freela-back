import { Router } from 'express'
import demandController from '../controllers/demandController'

const router = Router()

router.post('/insert', demandController.createDemand)
router.get('/show', demandController.showDemand)
router.get('/show-demand-by-id/:id', demandController.showDemandById)
router.patch('/update/:id', demandController.updateDemand)
router.delete('/remove/:id', demandController.removeDemand)
router.post('/register-on-demand/', demandController.registerOnDemand)

export default router