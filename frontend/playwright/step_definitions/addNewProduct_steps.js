const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('./POM/LoginPage');
const ArticlesListPage = require('./POM/articlesListPage');
const ArticlesDetailPage = require('./POM/articlesDetailPage');

// Inicializar los Page Objects después de que el navegador esté listo
Before(async function () {
    await this.init(); // viene del world.js
    this.loginPage = new LoginPage(this.page);
    this.articlesListPage = new ArticlesListPage(this.page);
    this.articlesDetailPage = new ArticlesDetailPage(this.page);
});

// Cerrar el navegador al final del escenario
After(async function () {
    await this.close();
});

When('accede a la página de artículos', {timeout: 20000}, async function () {
    await this.articlesListPage.accessArticlesList();
});

When('inicia el registro de un nuevo artículo', {timeout: 20000}, async function () {
    await this.articlesDetailPage.accessAddNewArticlePage();
    await this.articlesDetailPage.validateAccessToAddNewArticlePage();
});

When('completa los datos del artículo:', {timeout: 20000}, async function (dataTable) {
  const data = dataTable.rowsHash();
  await this.articlesDetailPage.fillArticleDetails(
    data.sku,
    data.nombre,
    parseInt(data.stock),
    parseInt(data.costo),
    parseInt(data.precio),
    data.unidad
  );
});

When('guarda el artículo', {timeout: 20000}, async function () {
  await this.articlesDetailPage.saveArticleDetails();
});

Then('el artículo {string} debe aparecer en el listado o en la confirmación', {timeout:20000}, async function (nombre) {
  await this.articlesDetailPage.validateNewArticleAdded(nombre);
});
