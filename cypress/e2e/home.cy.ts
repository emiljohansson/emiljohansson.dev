/// <reference types="cypress" />

context('Landing Page', () => {
	beforeEach(() => {
		cy.visit('/')
		cy.injectAxe()
	})

	it('validate accessibility', () => {
		cy.checkA11y(null, null, console.log)
	})

	// the feature is disabled
	it.skip('test dark mode and random string', () => {
		cy.get('[data-test="toggle-dark-mode"]').click()
		cy.get('[data-test="toggle-dark-mode"]').click()

		cy.get('[data-test=random-string]')
			.click()
			.url()
			.should('include', '/random-string')

		cy.get('[data-test="refresh"]').click()
		cy.get('[data-test="copy"]').focus().click()

		// Click a path
		cy.get('[data-test="back-link"]').click().url().should('include', '/')
	})
})
