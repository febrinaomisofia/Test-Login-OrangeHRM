class DashboardPage {

    verifyDashboardLoaded() {
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
    }

    pimMenu() {
        return cy.contains('PIM')
    }

    leaveMenu() {
        return cy.contains('Leave')
    }

    timeMenu() {
        return cy.contains('Time')
    }

    recruitmentMenu() {
        return cy.contains('Recruitment')
    }

    myInfoMenu() {
        return cy.contains('My Info')
    }

    userDropdown() {
        return cy.get('.oxd-userdropdown-tab')
    }

    searchInput() {
        return cy.get('input[placeholder="Search"]')
    }

}

export default DashboardPage