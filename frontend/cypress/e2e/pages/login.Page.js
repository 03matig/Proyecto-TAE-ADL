// Trabajamos el Page Object Model (POM) para la página del login

class Login {
    elements = {
        emailInput: () => cy.get("#email"),
        passwordInput: () => cy.get("#password"),
        loginButton: () => cy.get("#root > div > div > form > div:nth-child(4) > button"),
        validationButton: () => cy.get("#root > div > div > main > div > p")
    }

    typeEmail(email){
        this.elements.emailInput().type(email);
    }

    typePassword(password){
        this.elements.passwordInput().type(password);
    }

    clickLogin(){
        this.elements.loginButton().click();
    }

    checkValidation(){
        this.elements.validationButton()
            .should("be.visible")
            .and("contain", "Bienvenido al sistema ERP");
    }

    login(email, password){
        this.typeEmail(email);
        this.typePassword(password);
        this.clickLogin();
    }

    validateAccessToHomePage(){
        this.checkValidation();
    }
}

module.exports = new Login();