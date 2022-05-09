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

export async function randomRecommendationsFactory() {
	await prisma.recommendation.createMany({
		data: [
			{
				name: 'Marilia Mendonça - Troca de Calçada',
				youtubeLink: 'https://www.youtube.com/watch?v=WkYqQctOi9g'
			},
			{
				name: 'Mc Poze - Anos 80',
				youtubeLink: 'https://www.youtube.com/watch?v=WZIGwN-5Ioo'
			},
			{
				name: 'Linkin Park - In the End',
				youtubeLink: 'https://www.youtube.com/watch?v=DlkpbzXjuPM'
			},
			{
				name: 'Naruto - Rising Fight Spirit',
				youtubeLink: 'https://www.youtube.com/watch?v=G0lYBgfaCu8'
			}
		]
	})
}

export async function manyRecommendationsFactory() {
	await prisma.recommendation.createMany({
		data: [
			{
				name: 'Marilia Mendonça - Troca de Calçada',
				youtubeLink: 'https://www.youtube.com/watch?v=WkYqQctOi9g'
			},
			{
				name: 'Mc Poze - Anos 80',
				youtubeLink: 'https://www.youtube.com/watch?v=WZIGwN-5Ioo'
			},
			{
				name: 'Linkin Park - In the End',
				youtubeLink: 'https://www.youtube.com/watch?v=DlkpbzXjuPM'
			},
			{
				name: 'Naruto - Rising Fight Spirit',
				youtubeLink: 'https://www.youtube.com/watch?v=G0lYBgfaCu8'
			},
			{
				name: 'Harry Styles - As It Was',
				youtubeLink: 'https://www.youtube.com/watch?v=H5v3kku4y6Q'
			},
			{
				name: 'Samba In Paris - Baco Exu do Blues',
				youtubeLink: 'https://www.youtube.com/watch?v=4iKtTmnHojU'
			},
			{
				name: 'Miley Cyrus - Prisoner',
				youtubeLink: 'https://www.youtube.com/watch?v=0ir1qkPXPVM'
			},
			{
				name: 'Saturno - Bin',
				youtubeLink: 'https://www.youtube.com/watch?v=VF97zz_5oCc'
			},
			{
				name: 'Solto - Djonga',
				youtubeLink: 'https://www.youtube.com/watch?v=Mx7_i-C4G0c'
			},
			{
				name: '7 Rings - Ariana Grande',
				youtubeLink: 'https://www.youtube.com/watch?v=QYh6mYIJG2Y'
			},
			{
				name: 'Chefin Oficial - 212',
				youtubeLink: 'https://www.youtube.com/watch?v=290Q1JFInHE'
			},
			{
				name: 'Djonga - Ufa',
				youtubeLink: 'https://www.youtube.com/watch?v=tjD5_9idOVs'
			},
		]
	})
}

export function recommendationDataFactory() {
	const data = {
		id: 1,
		name: 'Marilia Mendonça - Troca de Calçada',
		youtubeLink: 'https://www.youtube.com/watch?v=WkYqQctOi9g',
		score: 1
	}

	return data
}