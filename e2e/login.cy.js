describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {

    // Menghapus cookies dan local storage untuk memastikan tidak ada session sebelumnya yang masih berjalan
    cy.clearCookies()
    cy.clearLocalStorage()

    // Membuka halaman login OrangeHRM
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      {
        failOnStatusCode: false,
        timeout: 60000
      }
    )

    // Memastikan field username berhasil dimuat
    cy.get("input[name='username']", { timeout: 20000 })
      .should('be.visible')

    // Mengisi username yang valid
    cy.get("input[name='username']")
      .clear()
      .type('Admin')

    // Mengisi password yang valid
    cy.get("input[name='password']")
      .clear()
      .type('admin123')

    // Melakukan aksi klik tombol login
    cy.get("button[type='submit']")
      .click()

    // Memastikan bahwa pengguna berhasil diarahkan ke halaman Dashboard
    cy.url({ timeout: 20000 })
      .should('include', '/dashboard')

  })

  // Verifikasi login berhasil ke URL mengarah ke dashboard
  it('TC001 - Verify Login Success', () => {
    cy.url().should('include', '/dashboard')
  })

  // Verifikasi header Dashboard ditampilkan setelah login
  it('TC002 - Verify Dashboard Header Displayed', () => {
    cy.contains('Dashboard')
      .should('be.visible')
  })

  // Verifikasi kolom search pada sidebar tersedia
  it('TC003 - Verify Search Menu Displayed', () => {
    cy.get("input[placeholder='Search']")
      .should('be.visible')
  })

  // Verifikasi dropdown pengguna tersedia pada sidebar
  it('TC004 - Verify User Dropdown Displayed', () => {
    cy.get('.oxd-userdropdown-tab')
      .should('be.visible')
  })

  // Verifikasi menu admin tersedia pada sidebar
  it('TC005 - Verify Admin Menu Displayed', () => {
    cy.contains('Admin')
      .should('be.visible')
  })

  // Verifikasi Menu PIM tersedia pada sidebar
  it('TC006 - Verify PIM menu displayed', () => {
  cy.contains('PIM')
    .should('be.visible')
  })

  // Verifikasi Menu display tersedia pada sidebar
  it('TC007 - Verify Leave menu displayed', () => {
  cy.contains('Leave')
    .should('be.visible')
  })

  // Verifikasi Time Menu tersedia pada sidebar
  it('TC008 - Verify Time menu displayed', () => {
  cy.contains('Time')
    .should('be.visible')
  })

  // Verifikasi Menu Recruitment tersedia pada sidebar
  it('TC009 - Verify Recruitment menu displayed', () => {
  cy.contains('Recruitment')
    .should('be.visible')
  })

  // Verifikasi My Info Menu tersedia pada sidebar
  it('TC010 - Verify My Info menu displayed', () => {
  cy.contains('My Info')
    .should('be.visible')
  })

  // Verifikasi elemen dropdown profil pengguna tersedia
  it('TC011 - Verify User Dropdown Exists', () => {
  cy.get('.oxd-userdropdown-tab')
    .should('exist')
  })

  // Verifikasi elemen search Input terdapat pada halaman dashboard
  it('TC012 - Verify Search Input Exists', () => {
  cy.get("input[placeholder='Search']")
    .should('exist')
  })

})