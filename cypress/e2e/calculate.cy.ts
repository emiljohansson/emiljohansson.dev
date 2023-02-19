/// <reference types="cypress" />

context('Calculate Page', () => {
	beforeEach(() => {
		cy.visit('/calculate')
		cy.injectAxe()
		cy.intercept('POST', '/api/calculate').as('api')
	})

	it('audits the page', () => {
		cy.lighthouse()
	})

	it('validate accessibility', () => {
		cy.checkA11y(null, null, console.log)
	})

	it('should calculate 1+2', () => {
		cy.get('input[name="q"]').click()
		cy.get('input[name="q"]').type('1+2')

		cy.get('[data-test=submit]').click()
		cy.wait(['@api'])
		cy.get('[data-test="sum"]').contains('3')
	})
})
