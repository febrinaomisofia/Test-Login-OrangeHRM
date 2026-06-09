import LoginPage from '../Pages/LoginPage'
import DashboardPage from '../Pages/DashboardPage'
import loginData from '../../fixtures/loginData.json'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()

describe('OrangeHRM Login POM', () => {

    beforeEach(() => {

        cy.clearCookies()
        cy.clearLocalStorage()

        loginPage.visit()
    })

    it('TC001 - Login with valid credentials', () => {

        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        )

        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })

    it('TC002 - Login with invalid password', () => {

        loginPage.login(
            loginData.invalidPassword.username,
            loginData.invalidPassword.password
        )

        loginPage.errorMessage()
            .should('contain', 'Invalid credentials')
    })

    it('TC003 - Login with invalid username', () => {

        loginPage.login(
            loginData.invalidUsername.username,
            loginData.invalidUsername.password
        )

        loginPage.errorMessage()
            .should('contain', 'Invalid credentials')
    })

    it('TC004 - Login with empty username', () => {

        loginPage.login(
            loginData.emptyUsername.username,
            loginData.emptyUsername.password
        )

        cy.contains('Required').should('be.visible')
    })

    it('TC005 - Login with empty password', () => {

        loginPage.login(
            loginData.emptyPassword.username,
            loginData.emptyPassword.password
        )

        cy.contains('Required').should('be.visible')
    })

    it('TC006 - Verify PIM menu displayed', () => {

        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        )

        dashboardPage.pimMenu()
            .should('be.visible')
    })

    it('TC007 - Verify Leave menu displayed', () => {

        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        )

        dashboardPage.leaveMenu()
            .should('be.visible')
    })

    it('TC008 - Verify Time menu displayed', () => {

        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        )

        dashboardPage.timeMenu()
            .should('be.visible')
    })

    it('TC009 - Verify Recruitment menu displayed', () => {

        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        )

        dashboardPage.recruitmentMenu()
            .should('be.visible')
    })

    it('TC010 - Verify My Info menu displayed', () => {

        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        )

        dashboardPage.myInfoMenu()
            .should('be.visible')
    })

    it('TC011 - Verify User Dropdown Exists', () => {

        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        )

        dashboardPage.userDropdown()
            .should('exist')
    })

    it('TC012 - Verify Search Input Exists', () => {

        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        )

        dashboardPage.searchInput()
            .should('exist')
    })

})