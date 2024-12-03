describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('harus menampilkan form login', () => {
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('harus menampilkan pesan error jika email tidak valid', () => {
    cy.get('input[name="email"]').type('email-tidak-valid');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();
    cy.contains('Harap masukan format dengan benar').should('be.visible');
  });

  it('harus menampilkan pesan error jika password terlalu pendek', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('');
    cy.get('form').submit();
    cy.contains('Harap diisi terlebih dahulu').should('be.visible');
  });

  it('harus berhasil login dengan kredensial yang valid', () => {
    cy.intercept('POST', '/api/auth/login').as('loginRequest');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/dashboard');
    cy.getCookie('token').should('exist');
  });

  it('harus bisa mengubah visibilitas password', () => {
    cy.get('input[name="password"]').type('password123');
    cy.get('.cursor-pointer').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    cy.get('.cursor-pointer').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });
});
