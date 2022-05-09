import { Request, Response } from 'express'
import { recommendationService } from '../services/recommendationsService'

export async function deleteAll(req: Request, res: Response) {
	await recommendationService.deleteAll()

	res.sendStatus(200)
}