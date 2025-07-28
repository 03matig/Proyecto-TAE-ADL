const { test, expect } = require('@playwright/test');
const LoginPage = require('../step_definitions/POM/LoginPage');
const ArticlesListPage = require('../step_definitions/POM/articlesListPage');
const ArticlesDetailPage = require('../step_definitions/POM/articlesDetailPage');

const baseUrl = 'https://test-adl.leonardojose.dev/';
const testingEmail = 'testeradl@test.com';
const testingPassword = 'Tester@2025';

test.use({
  viewport: { width: 1920, height: 1080 }
});

test.describe('E2E - Agregar nuevo producto con datos hardcodeados', () => {
  test('Agregar los dos primeros productos del set hardcodeado', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const articlesListPage = new ArticlesListPage(page);
    const articlesDetailPage = new ArticlesDetailPage(page);

    // Datos hardcodeados (sin fixture)
    const productos = [
      {
        sku: "IP-16-7",
        description: "iPhone 16 128gb negro - Marca Apple",
        stock: 15,
        buyingCost: 549990,
        salePrice: 849990,
        measureUnit: "Unidad"
      },
      {
        sku: "IP-16-PM-6",
        description: "iPhone 16 Pro Max 256gb - Titanio negro + lámina - Marca Apple",
        stock: 10,
        buyingCost: 789990,
        salePrice: 1209990,
        measureUnit: "Caja"
      }
    ];

    // Navegación e inicio de sesión
    await page.goto(baseUrl);
    await loginPage.login(testingEmail, testingPassword);
    await loginPage.validateAccessToHomePage();

    // Acceder a la lista de artículos
    await articlesListPage.accessArticlesList();
    await articlesListPage.validateArticlesListAccess();
    await articlesListPage.validateArticlesListContent();

    for (const producto of productos) {
      await articlesDetailPage.accessAddNewArticlePage();
      await articlesDetailPage.validateAccessToAddNewArticlePage();

      await articlesDetailPage.fillArticleDetails(
        producto.sku,
        producto.description,
        producto.stock,
        producto.buyingCost,
        producto.salePrice,
        producto.measureUnit
      );

      await articlesDetailPage.saveArticleDetails();
      await articlesDetailPage.validateNewArticleAdded(producto.description);

      await page.waitForTimeout(2000); // Esperamos a que se oculte el toast o redireccione
    }
  }, 60000);
});
