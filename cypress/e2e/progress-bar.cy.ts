/// <reference types="cypress" />

context('Progress Bar Page', () => {
  beforeEach(() => {
    cy.visit('/progress-bar')
    cy.injectAxe()
  })

  it('audits the page', () => {
    cy.lighthouse()
  })

  it('validate accessibility', () => {
    cy.checkA11y(null, null, console.log)
  })
})
