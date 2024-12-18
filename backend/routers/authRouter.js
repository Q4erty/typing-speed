import { Router } from 'express'
import { check } from 'express-validator'
import authController from '../controllers/authController.js'

const router = new Router()

router.post(
	'/registration',
	[
		check('username', "Name can't be empty").notEmpty(),
		check('password', 'Password should be in range from 4 to 15').isLength({
			min: 4,
			max: 15,
		}),
	],
	authController.registration
)
router.post('/login', authController.login)

export default router
