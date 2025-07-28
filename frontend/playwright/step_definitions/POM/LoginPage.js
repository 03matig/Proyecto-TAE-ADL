// playwright/pages/Login.js

class Login {
    /**
     * Constructor que recibe el objeto `page` del contexto de Playwright.
     */
    constructor(page) {
        this.page = page;
        this.emailInput = '#email';
        this.passwordInput = '#password';
        this.loginButton = '#root > div > div > form > div:nth-child(4) > button';
        this.validationText = '#root > div > div > main > div > p';
    }

    async typeEmail(email) {
        await this.page.fill(this.emailInput, email);
    }

    async typePassword(password) {
        await this.page.fill(this.passwordInput, password);
    }

    async clickLogin() {
        await this.page.click(this.loginButton);
    }

    async checkValidation() {
        await this.page.waitForSelector(this.validationText, { state: 'visible' });
        const text = await this.page.textContent(this.validationText);
        if (!text.includes('Bienvenido al sistema ERP')) {
            throw new Error('El texto de validación no coincide');
        }
    }

    async login(email, password) {
        await this.typeEmail(email);
        await this.typePassword(password);
        await this.clickLogin();
    }

    async validateAccessToHomePage() {
        await this.checkValidation();
    }
}

module.exports = Login;
