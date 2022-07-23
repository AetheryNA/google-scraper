import { registerNewUser, loginUser } from '../test.helper';
import { createRandomUser } from '../fixtures/regisiterUser.fixture';

describe('View HTML', () => {
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

  it('should let the user see the HTML', () => {
    uploadFile();

    cy.visit('/results');

    cy.get('.button').first().click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/results/view-html');
    });
  });
});
