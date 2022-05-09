/* eslint-disable quotes */
describe('Add new song and vote up/down', () => {
	beforeEach(() => {
		cy.request('POST', 'http://localhost:5000/test/truncate')
	})

	it('should post a new song recommendation, vote and remove by low score', () => {
		const newSong = {
			name: 'Marilia Mendonça - Troca de Calçada',
			youtubeLink: 'https://www.youtube.com/watch?v=WkYqQctOi9g'
		}
		cy.visit('http://localhost:3000/')

		cy.get("input[placeholder = 'Name']").type(newSong.name)
		cy.get("input[placeholder ~= 'https://youtu.be/...']").type(newSong.youtubeLink)

		cy.intercept('POST', 'http://localhost:5000/recommendations').as('postRecommendation')
		cy.get('Button').click()

		cy.wait('@postRecommendation')
		cy.contains(newSong.name).should('be.visible')

		cy.get('.upVote').click()
		cy.get('.upVote').click()
		cy.get('.upVote').click()
		cy.get('.score').should('have.text', '3')

		cy.get('.downVote').click()
		cy.get('.downVote').click()
		cy.get('.score').should('have.text', '1')
	})
})

describe("Navigate to pages 'top' and 'random'", () => {
	it("should visit the pages correctly", () => {
		const newSong = {
			name: 'Marilia Mendonça - Troca de Calçada',
			youtubeLink: 'https://www.youtube.com/watch?v=WkYqQctOi9g'
		}

		cy.visit("http://localhost:3000/")

		cy.intercept("GET", "/recommendations/top/*").as("getTop")
		cy.contains("Top").click()

		cy.wait("@getTop")
		cy.url().should("equal", "http://localhost:3000/top")
		cy.contains(newSong.name).should("be.visible")

		cy.intercept("GET", "/recommendations/random").as("getRandom")
		cy.contains("Random").click()

		cy.wait("@getRandom")
		cy.url().should("equal", "http://localhost:3000/random")
		cy.contains(newSong.name).should("be.visible")
	})
})