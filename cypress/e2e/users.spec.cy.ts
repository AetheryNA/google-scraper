import { createRandomUser } from '../fixtures/regisiterUser.fixture';
import { registerNewUser } from '../test.helper';

describe('Users page', () => {
  it('should find the form in the sign in page', () => {
    cy.visit('/users/sign-in');

    cy.get('.auth-form').contains('h1', 'Login to Continue');
  });

  it('should find the form in the sign up page', () => {
    cy.visit('/users/sign-up');

    cy.get('.auth-form').contains('h1', 'Create a new account');
  });

  it('should be able to select input fields and click sign up button', () => {
    const newUser = createRandomUser();

    registerNewUser(newUser);

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/');
    });
  });

  it('should be able to visit the dashboard page', () => {
    const newUser = createRandomUser();

    registerNewUser(newUser);

    cy.get('.auth-form__username').type(newUser.username);
    cy.get('.auth-form__password').type(newUser.password);

    cy.get('.auth-form__button').click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/dashboard/home');
    });

    it('should not let the user access dashboard without logging in', () => {
      cy.visit('/dashboard/home');

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/');
      });
    });
  });
});
