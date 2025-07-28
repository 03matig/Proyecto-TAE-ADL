const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ArticlesDetailPage = require('./POM/articlesDetailPage');

let page, context, browser;
let articlesDetailPage;

Given('que el usuario accede al sistema correctamente', async function () {
  ({ browser, context, page } = await this.launchBrowser());
  await page.goto('http://localhost:3000/login'); // ajusta si es otra URL

  await page.getByLabel('Email').fill('usuario@ejemplo.com');
  await page.getByLabel('Contraseña').fill('contrasena123');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

  await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 10000 });
});

When('accede a la página de artículos', async function () {
  await page.getByRole('link', { name: 'Artículos' }).click();
  await expect(page.getByRole('heading', { name: 'Crear Nuevo Artículo' })).toBeVisible();
  articlesDetailPage = new ArticlesDetailPage(page);
});

When('inicia el registro de un nuevo artículo', async function () {
  await articlesDetailPage.accessAddNewArticlePage();
  await articlesDetailPage.validateAccessToAddNewArticlePage();
});

When('completa los datos del artículo:', async function (dataTable) {
  const data = dataTable.rowsHash();
  await articlesDetailPage.fillArticleDetails(
    data.sku,
    data.nombre,
    parseInt(data.stock),
    parseInt(data.costo),
    parseInt(data.precio),
    data.unidad
  );
});

When('guarda el artículo', async function () {
  await articlesDetailPage.saveArticleDetails();
});

Then('el artículo {string} debe aparecer en el listado o en la confirmación', async function (nombre) {
  await articlesDetailPage.validateNewArticleAdded(nombre);
  await browser.close(); // Cleanup
});
