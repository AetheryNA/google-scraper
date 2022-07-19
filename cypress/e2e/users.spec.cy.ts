import { createRandomUser } from '../fixtures/regisiterUser.fixture';

describe('Users page', () => {
  it('should visit the login form', () => {
    cy.visit('/users/sign-in');
  });

  it('should visit the register form', () => {
    cy.visit('/users/sign-up');
  });

  it('should find the form in the sign in page', () => {
    cy.visit('/users/sign-in');

    cy.get('.auth-form').contains('h1', 'Login in to Continue');
  });

  it('should find the form in the sign up page', () => {
    cy.visit('/users/sign-up');

    cy.get('.auth-form').contains('h1', 'Create a new account');
  });

  it('should be able to select input fields and click sign up button', () => {
    const newUser = createRandomUser();

    cy.visit('/users/sign-up');

    cy.get('.auth-form__username').type(newUser.username);
    cy.get('.auth-form__password').type(newUser.password);

    cy.get('.auth-form__button').click();
  });

  it('should be able to select input fields and click sign in button', () => {
    const newUser = createRandomUser();

    cy.visit('/users/sign-up');

    cy.get('.auth-form__username').type(newUser.username);
    cy.get('.auth-form__password').type(newUser.password);

    cy.get('.auth-form__button').click();

    cy.visit('/users/sign-in');

    cy.get('.auth-form__username').type(newUser.username);
    cy.get('.auth-form__password').type(newUser.password);

    cy.get('.auth-form__button').click();

    cy.visit('/dashboard/home');
  });
});
