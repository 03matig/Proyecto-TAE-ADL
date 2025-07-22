const loginPage = require("./pages/login.Page")
const articlesListPage = require("./pages/articlesList.Page");

// En primer lugar, procederemos a definir las variables base que estaremos utilizando en nuestro set de pruebas.
const baseUrl = "https://test-adl.leonardojose.dev/";
const testingEmail = "testeradl@test.com";
const testingPassword = "Tester@2025";

describe("Set de pruebas 'End to End' (E2E) para Sistema ERP de SELGOM S.A.", () => {
    // Lo primero que haremos, será establecer un Hook Iterativo base que realice un patrón antes de cada prueba, en este caso, el inicio de sesión.
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit(baseUrl);
        loginPage.login(testingEmail, testingPassword);
        loginPage.validateAccessToHomePage();
    });

    it("Inicio de sesión y consulta de productos", () => {
        // Accedemos a la vista de la página donde se listan los artículos.
        articlesListPage.accessArticlesList();

        // Validamos que se haya accedido correctamente a la lista de artículos.
        articlesListPage.validateArticlesListAccess();

        // Validamos que el contenido de la lista de artículos sea el esperado
        // Si falla, significa que alguno de los atributos (las columnas) de la lista de artículos no se está mostrando/no tiene valor.
        articlesListPage.validateArticlesListContent();
    });
});