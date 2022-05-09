import { jest } from '@jest/globals'
import { recommendationRepository } from '../../src/repositories/recommendationRepository'
import { recommendationService } from '../../src/services/recommendationsService'
import { recommendationDataFactory } from '../factories/recommendationFactory'

const conflictError = {
	message: 'Recommendations names must be unique',
	type: 'conflict'
}

const notFoundError = {
	message: '',
	type: 'not_found'
}

describe('testing recommendations services', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.resetAllMocks()
	})

	it('should throw error if recommendation name is already existing', async () => {
		const recommendation = recommendationDataFactory()

		jest.spyOn(recommendationRepository, 'findByName').mockResolvedValue({ ...recommendation })
		jest.spyOn(recommendationRepository, 'create').mockResolvedValue()

		expect(async() => {
			await recommendationService.insert(recommendation)
		}).rejects.toEqual(conflictError)
	})

	it('should remove recommendation when score is less than 5', async () => {
		const recommendation = recommendationDataFactory()

		jest.spyOn(recommendationRepository, 'find').mockResolvedValue(recommendation)
		jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValue({ ...recommendation, score: -6 })

		const removeRecommendation = jest.spyOn(recommendationRepository, 'remove').mockResolvedValue(null)

		await recommendationService.downvote(1)

		expect(removeRecommendation).toHaveBeenCalledTimes(1)
	})

	it('should throw error if no recommendation is find', async () => {
		jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue([])

		expect(async () => {
			await recommendationService.getRandom()
		}).rejects.toEqual(notFoundError)
	})

	it('should return a recommendation with score between -5 and 10', async () => {
		const recommendation = recommendationDataFactory()

		jest.spyOn(Math, 'random').mockReturnValueOnce(0.9)

		const recommendationFind = jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue([{ ...recommendation, score: -10 }])

		await recommendationService.getRandom()

		expect(recommendationFind).toHaveBeenCalledTimes(1)
	})

	it('should throw error if no recommendation id is find', async () => {
		jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null)

		expect(async () => {
			await recommendationService.getById(null)
		}).rejects.toEqual(notFoundError)
	})
	
	it('should return gt if value is lower than 0.7', async () => {
		const result = recommendationService.getScoreFilter(0.69)

		expect(result).toBe('gt')
	})

	it('should return lte if value is higher than 0.7', async () => {
		const result = recommendationService.getScoreFilter(0.71)

		expect(result).toBe('lte')
	})

	it('should delete table recommendation', async () => {
		const truncate = jest.spyOn(recommendationRepository, 'truncate')

		await recommendationService.deleteAll()

		expect(truncate).toBeCalledTimes(1)
	})
})