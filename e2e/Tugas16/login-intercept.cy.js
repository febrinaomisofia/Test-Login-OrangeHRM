describe('OrangeHRM Login - Intercept Test', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('Login Success', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('eq', 302)

    cy.url().should('include', '/dashboard')
  })

  it('Login with Empty Username', () => {
    cy.intercept('GET', '**/auth/login').as('loginPage')

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    

    cy.contains('Required').should('be.visible')
  })

  it('Login with Empty Password', () => {
    cy.intercept('GET', '**/auth/login').as('loginAgain')

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()


    cy.contains('Required').should('be.visible')
  })

  it('Login with Invalid Username', () => {
    cy.intercept('POST', '**/auth/validate').as('invalidUsername')

    cy.get('input[name="username"]').type('WrongUser')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('Login with Invalid Password', () => {
    cy.intercept('POST', '**/auth/validate').as('invalidPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('wrongpass')
    cy.get('button[type="submit"]').click()

    

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('Login with Empty Username and Password', () => {
    cy.intercept('GET', '**/auth/login').as('emptyFields')

    cy.get('button[type="submit"]').click()

    

    cy.contains('Required').should('be.visible')
  })

  it('Verify Login API Called Once', () => {
    cy.intercept('POST', '**/auth/validate').as('loginApi')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    

    cy.get('@loginApi.all')
      .should('have.length', 1)
  })

  it('Navigate to Forgot Password Page', () => {
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('forgotPassword')

    cy.contains('Forgot your password?').click()

    

    cy.url().should('include', 'requestPasswordResetCode')
  })

})