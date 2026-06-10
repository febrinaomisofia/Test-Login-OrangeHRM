describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      {
        failOnStatusCode: false,
        timeout: 60000
      }
    )

    cy.get("input[name='username']", { timeout: 20000 })
      .should('be.visible')

    cy.get("input[name='username']")
      .clear()
      .type('Admin')

    cy.get("input[name='password']")
      .clear()
      .type('admin123')

    cy.get("button[type='submit']")
      .click()

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard')
  })

  it('TC001 - Verify Login Success', () => {
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('TC002 - Verify Dashboard Header Displayed', () => {
    cy.contains('Dashboard')
      .should('be.visible')
      .and('contain.text', 'Dashboard')
  })

  it('TC003 - Verify Search Menu Displayed', () => {
    cy.get("input[placeholder='Search']")
      .should('be.visible')
      .and('exist')
  })

  it('TC004 - Verify User Dropdown Displayed', () => {
    cy.get('.oxd-userdropdown-tab')
      .should('be.visible')
      .and('contain.text', 'Admin') // atau hapus jika nama user berubah
  })

  it('TC005 - Verify Admin Menu Displayed', () => {
    cy.contains('Admin')
      .should('be.visible')
      .and('exist')
  })

  it('TC006 - Verify PIM Menu Displayed', () => {
    cy.contains('PIM')
      .should('be.visible')
      .and('exist')
  })

  it('TC007 - Verify Leave Menu Displayed', () => {
    cy.contains('Leave')
      .should('be.visible')
      .and('exist')
  })

  it('TC008 - Verify Time Menu Displayed', () => {
    cy.contains('Time')
      .should('be.visible')
      .and('exist')
  })

  it('TC009 - Verify Recruitment Menu Displayed', () => {
    cy.contains('Recruitment')
      .should('be.visible')
      .and('exist')
  })

  it('TC010 - Verify My Info Menu Displayed', () => {
    cy.contains('My Info')
      .should('be.visible')
      .and('exist')
  })

  it('TC011 - Verify User Dropdown Exists', () => {
    cy.get('.oxd-userdropdown-tab')
      .should('exist')
      .and('be.visible')
  })

  it('TC012 - Verify Search Input Exists', () => {
    cy.get("input[placeholder='Search']")
      .should('exist')
      .and('be.visible')
  })

})