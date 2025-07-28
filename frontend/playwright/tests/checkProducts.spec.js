const { test, expect } = require('@playwright/test');
const LoginPage = require('../step_definitions/POM/LoginPage');
const ArticlesListPage = require('../step_definitions/POM/articlesListPage');

const baseUrl = 'https://test-adl.leonardojose.dev/';
const testingEmail = 'testeradl@test.com';
const testingPassword = 'Tester@2025';

test.describe("E2E - Consulta de Productos", () => {
  let loginPage;
  let articlesListPage;

  test.beforeEach(async ({ page }) => {
    // Instanciar los Page Objects
    loginPage = new LoginPage(page);
    articlesListPage = new ArticlesListPage(page);

    // Preparar viewport y navegación
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(baseUrl);

    // Login
    await loginPage.login(testingEmail, testingPassword);
    await loginPage.validateAccessToHomePage();
  });

  test("Inicio de sesión y consulta de productos", async ({ page }) => {
    // Navegar a la lista de artículos
    await articlesListPage.accessArticlesList();

    // Validar acceso a vista
    await articlesListPage.validateArticlesListAccess();

    // Validar contenido de la tabla
    await articlesListPage.validateArticlesListContent();
  });
});
