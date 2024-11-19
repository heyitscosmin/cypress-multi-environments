describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.log(Cypress.env('accounts').admin.username);
    cy.log(Cypress.env('accounts').admin.password);
  })
})