class LoginPage {

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    usernameInput() {
        return cy.get('input[name="username"]')
    }

    passwordInput() {
        return cy.get('input[name="password"]')
    }

    loginButton() {
        return cy.get('button[type="submit"]')
    }

    errorMessage() {
        return cy.get('.oxd-alert-content-text')
    }

    login(username, password) {

        if (username !== '') {
            this.usernameInput().clear().type(username)
        }

        if (password !== '') {
            this.passwordInput().clear().type(password)
        }

        this.loginButton().click()
    }
}

export default LoginPage