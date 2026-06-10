describe('OrangeHRM Login - Intercept Test', () => {

  beforeEach(() => {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      {
        failOnStatusCode: false,
        timeout: 60000
      }
    )

    cy.get('input[name="username"]', { timeout: 20000 })
      .should('be.visible')
  })

  it('TC001 - Login Success', () => {
    cy.intercept('POST', '**/auth/validate').as('loginSuccess')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginSuccess')

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('TC002 - Login with Empty Username', () => {
    cy.intercept('GET', '**/auth/login').as('emptyUsername')

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Required')
      .should('be.visible')
      .and('contain.text', 'Required')
  })

  it('TC003 - Login with Empty Password', () => {
    cy.intercept('GET', '**/auth/login').as('emptyPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Required')
      .should('be.visible')
      .and('contain.text', 'Required')
  })

  it('TC004 - Login with Invalid Username', () => {
    cy.intercept('POST', '**/auth/validate').as('invalidUsername')

    cy.get('input[name="username"]').type('WrongUser')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidUsername')

    cy.contains('Invalid credentials')
      .should('be.visible')
      .and('contain.text', 'Invalid credentials')
  })

  it('TC005 - Login with Invalid Password', () => {
    cy.intercept('POST', '**/auth/validate').as('invalidPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('wrongpass')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidPassword')

    cy.contains('Invalid credentials')
      .should('be.visible')
      .and('contain.text', 'Invalid credentials')
  })

  it('TC006 - Login with Empty Username and Password', () => {
    cy.intercept('GET', '**/auth/login').as('emptyFields')

    cy.get('button[type="submit"]').click()

    cy.contains('Required')
      .should('be.visible')
  })

  it('TC007 - Verify Login API Called Once', () => {
    cy.intercept('POST', '**/auth/validate').as('loginApi')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginApi')

    cy.get('@loginApi.all')
      .should('have.length', 1)

    cy.url().should('include', '/dashboard')
  })

  it('TC008 - Navigate to Forgot Password Page', () => {
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('forgotPassword')

    cy.contains('Forgot your password?').click()

    cy.wait('@forgotPassword')

    cy.url()
      .should('include', 'requestPasswordResetCode')
  })

})