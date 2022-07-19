import { registerNewUser, loginUser } from '../test.helper';
import { createRandomUser } from '../fixtures/regisiterUser.fixture';

describe('Dashboard Controller', () => {
  beforeEach(() => {
    const newUser = createRandomUser();

    registerNewUser(newUser);
    loginUser(newUser);
  });

  it('should find the dashboard', () => {
    cy.get('.dashboard').contains('h1', 'G-Scraper');
  });

  it('should let the user upload a file', () => {
    cy.get('.dashboard__upload-file').selectFile(
      'cypress/fixtures/fixture.csv',
    );

    cy.get('.dashboard__submit-upload').click();

    cy.get('.dashboard__success-msg').contains(
      'p',
      'File uploaded successfully',
    );
  });
});
