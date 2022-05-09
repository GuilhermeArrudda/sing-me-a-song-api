import supertest from 'supertest'
import app from '../../src/app.js'
import { prisma } from '../../src/database.js'
import { bodyFactory, manyRecommendationsFactory, randomRecommendationsFactory, recommendationFactory } from '../factories/recommendationFactory.js'

const agent = supertest(app)

describe('testing recommendations', () => {
	beforeEach(deleteAll)
	afterAll(disconnect)

	it('should return statusCode 201 and persist given a valid request', async () => {
		const body = bodyFactory()

		const result = await agent.post('/recommendations').send(body)
		const status = result.status

		const created = await prisma.recommendation.findUnique({
			where: {
				name: body.name
			}
		})

		expect(status).toEqual(201)
		expect(created).not.toBeNull()
	})

	it('should return statusCode 200 and increment the counter', async () => {
		const recommendation = await recommendationFactory()

		const counterBefore = await prisma.recommendation.findUnique({
			where: {
				id: recommendation.id
			}
		})

		const result = await agent.post(`/recommendations/${recommendation.id}/upvote`).send()
		const status = result.status

		const counterAfter = await prisma.recommendation.findUnique({
			where: {
				id: recommendation.id
			}
		})
		expect(status).toEqual(200)
		expect(counterAfter.score - counterBefore.score).toEqual(1)
	})

	it('should return statusCode 200 and decrement the counter', async () => {
		const recommendation = await recommendationFactory()

		const counterBefore = await prisma.recommendation.findUnique({
			where: {
				id: recommendation.id
			}
		})

		const result = await agent.post(`/recommendations/${recommendation.id}/downvote`).send()
		const status = result.status

		const counterAfter = await prisma.recommendation.findUnique({
			where: {
				id: recommendation.id
			}
		})
		expect(status).toEqual(200)
		expect(counterAfter.score - counterBefore.score).toEqual(-1)
	})

	it('should return statusCode 200 and random recommendation', async () => {
		await randomRecommendationsFactory()

		const result = await agent.get('/recommendations/random')
		const status = result.status

		expect(status).toEqual(200)
		expect(result.body).not.toBe(null)
	})

	it('should return statusCode 200 and top 10 recommendations', async () => {
		await manyRecommendationsFactory()

		const result = await agent.get('/recommendations')
		const status = result.status

		expect(status).toEqual(200)
		expect(result.body.length).toEqual(10)
	})

	it('should return statusCode 200 and recommendation find by id', async () => {
		const recommendation = await recommendationFactory()

		const result = await agent.get(`/recommendations/${recommendation.id}`)
		const status= result.status

		expect(status).toEqual(200)
		expect(result.body.id).toEqual(recommendation.id)
	})

	it('should return statusCode 200 and better recommendations', async () => {
		await randomRecommendationsFactory()
		const amount = 4

		const result = await agent.get(`/recommendations/top/${amount}`)
		const status = result.status

		expect(status).toEqual(200)
		expect(result.body.length).toEqual(amount)
	})
})

async function deleteAll() {
	await prisma.$executeRaw`TRUNCATE TABLE recommendations;`
}

async function disconnect() {
	await prisma.$disconnect()
}