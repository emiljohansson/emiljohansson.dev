/// <reference types="cypress" />

context('Landing Page', () => {
	beforeEach(() => {
		cy.visit('/')
		cy.injectAxe()
	})

	it('audits the page', () => {
		cy.lighthouse()
	})

	it('validate accessibility', () => {
		cy.checkA11y(null, null, console.log)
	})

	it('test dark mode and random string', () => {
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
