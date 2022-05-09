import { prisma } from '../../src/database.js'

export function bodyFactory() {
	const body = {
		name: 'Marilia Mendonça - Troca de Calçada',
		youtubeLink: 'https://www.youtube.com/watch?v=WkYqQctOi9g'
	}

	return body
}

export async function recommendationFactory() {
	const create = await prisma.recommendation.create({
		data: {
			name: 'Marilia Mendonça - Troca de Calçada',
			youtubeLink: 'https://www.youtube.com/watch?v=WkYqQctOi9g'
		}
	})

	return create
}