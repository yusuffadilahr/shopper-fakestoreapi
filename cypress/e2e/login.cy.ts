describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('harus berhasil login dengan kredensial yang valid', () => {
    cy.intercept('POST', '/api/auth/login').as('loginRequest');
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('123123');
    cy.get('form').submit();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/dashboard');
    cy.getCookie('token').should('exist');
  });
});
