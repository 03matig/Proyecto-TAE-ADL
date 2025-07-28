// step_definitions/common_steps.js

const { Given, When } = require('@cucumber/cucumber');

Given('que el usuario ha iniciado sesión con correo {string} y contraseña {string}', { timeout: 20000 }, async function (email, password) {
    const baseUrl = this.parameters.baseUrl || 'https://test-adl.leonardojose.dev/';
    await this.page.goto(baseUrl);
    await this.loginPage.login(email, password);
    await this.loginPage.validateAccessToHomePage();
});