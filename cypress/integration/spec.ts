it('application workflow', () => {
  cy.visit('/');
  cy.wait(2000);
  cy.get('input[type=text]').type('comedy');
  cy.wait(5000);
  cy.get('.suggestions-container > .chip').first().click();
  cy.wait(5000);
  cy.get('.suggestions-container.selected > .chip mdb-icon').first().click();
  cy.wait(5000);
  cy.get('.page-item:nth-child(3)').click();
});
