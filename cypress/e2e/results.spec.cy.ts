import { registerNewUser, loginUser, uploadFile } from '../test.helper';
import { createRandomUser } from '../fixtures/regisiterUser.fixture';

describe('Results Controller', () => {
  beforeEach(() => {
    const newUser = createRandomUser();

    registerNewUser(newUser);
    loginUser(newUser);
  });

  it('should find the results page', () => {
    cy.visit('/results');

    cy.get('.results__head').contains('h1', 'My Searches');
  });

  it('should find uploaded results in the page', () => {
    uploadFile();

    cy.visit('/results');
    cy.get('#search-keyword').type('batman').type('{enter}');

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/results/search-keywords');
    });
  });
});
