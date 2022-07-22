export const registerNewUser = (createUser: any) => {
  cy.visit('/users/sign-up');

  cy.get('.auth-form__username').type(createUser.username);
  cy.get('.auth-form__password').type(createUser.password);

  cy.get('.auth-form__button').click();
};

export const loginUser = (user: any) => {
  cy.visit('/users/sign-in');

  cy.get('.auth-form__username').type(user.username);
  cy.get('.auth-form__password').type(user.password);

  cy.get('.auth-form__button').click();
};

export const uploadFile = () => {
  cy.get('.dashboard__upload-file').selectFile('cypress/fixtures/fixture.csv');

  cy.get('.dashboard__submit-upload').click();
};
