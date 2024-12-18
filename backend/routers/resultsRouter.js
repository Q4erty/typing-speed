import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import resultsController from '../controllers/resultsController.js'

const router = new Router()

router.post('/addResults', authMiddleware, resultsController.addResults)
router.get('/getResults', authMiddleware, resultsController.getResults)

export default router
