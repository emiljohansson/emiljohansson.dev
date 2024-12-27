/// <reference types="cypress" />

context('Progress Bar Page', () => {
	beforeEach(() => {
		cy.visit('/progress-bar')
		cy.injectAxe()
	})

	it('validate accessibility', () => {
		cy.checkA11y(null, null, console.log)
	})
})
