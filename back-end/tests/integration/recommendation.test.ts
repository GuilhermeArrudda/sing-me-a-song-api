import supertest from 'supertest'
import app from '../../src/app.js'
import { prisma } from '../../src/database.js'
import { bodyFactory, recommendationFactory } from '../factories/recommendationFactory.js'

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
})

async function deleteAll() {
	await prisma.$executeRaw`TRUNCATE TABLE recommendations;`
}

async function disconnect() {
	await prisma.$disconnect()
}