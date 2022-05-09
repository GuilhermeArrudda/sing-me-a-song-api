import { Router } from 'express'
import * as testController from '../controllers/testsController.js'

const testRouter = Router()

testRouter.post('/test/truncate', testController.deleteAll)

export default testRouter