import { recommendationRepository } from '../repositories/recommendationRepository.js'

async function deleteAll() {
	await recommendationRepository.truncate()
}

export const testService = {
	deleteAll
}