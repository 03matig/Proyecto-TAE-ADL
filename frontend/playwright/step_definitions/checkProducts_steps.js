const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('./POM/LoginPage');
const ArticlesListPage = require('./POM/articlesListPage');

// Inicializar los Page Objects después de que el navegador esté listo
Before(async function () {
    await this.init(); // viene del world.js
    this.loginPage = new LoginPage(this.page);
    this.articlesListPage = new ArticlesListPage(this.page);
});

// Cerrar el navegador al final del escenario
After(async function () {
    await this.close();
});

When('accede a la vista de lista de artículos', {timeout: 20000}, async function () {
    await this.articlesListPage.accessArticlesList();
});

Then('debe visualizar el título {string}', {timeout: 20000}, async function (titulo) {
    const title = this.page.locator(this.articlesListPage.selectors.articlesListViewTitle);
    await expect(title).toBeVisible();
    await expect(title).toHaveText(titulo);
});

Then('debe visualizar correctamente la información del primer artículo en la tabla', {timeout: 20000}, async function () {
    await this.articlesListPage.validateArticlesListContent();
});
