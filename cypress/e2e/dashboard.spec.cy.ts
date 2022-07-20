import { registerNewUser, loginUser } from '../test.helper';
import { createRandomUser } from '../fixtures/regisiterUser.fixture';

describe('Dashboard Controller', () => {
  const uploadFile = () => {
    cy.get('.dashboard__upload-file').selectFile(
      'cypress/fixtures/fixture.csv',
    );

    cy.get('.dashboard__submit-upload').click();
  };

  beforeEach(() => {
    const newUser = createRandomUser();

    registerNewUser(newUser);
    loginUser(newUser);
  });

  it('should find the dashboard', () => {
    cy.get('.dashboard').contains('h1', 'G-Scraper');
  });

  it('should let the user upload a file', () => {
    uploadFile();

    cy.get('.dashboard__success-msg').contains(
      'p',
      'File uploaded successfully',
    );
  });

  it('should let the user upload a file and find all keywords from the file', () => {
    uploadFile();

    cy.get('.dashboard__item').should('be.visible');
  });
});
