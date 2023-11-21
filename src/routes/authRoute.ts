import { Router } from 'express'
import authController from '../controllers/authController'

const router = Router()

router.post('/sign-up', authController.signUp)
router.post('/login', authController.login)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)

export default router

