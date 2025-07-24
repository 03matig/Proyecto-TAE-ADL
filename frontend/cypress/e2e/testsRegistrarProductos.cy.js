// En primer lugar, procederemos a importar el modelado de objetos en base a las vistas de la página (POM) que estaremos testeando.
const loginPage = require("./pages/login.Page")
const articlesListPage = require("./pages/articlesList.Page");
const articlesDetailPage = require("./pages/articlesDetail.Page");

// En segundo lugar, procederemos a definir las variables base por medio de variables de entorno que estaremos utilizando en nuestro set de pruebas.
const baseUrl = Cypress.env("baseUrl");
const testingEmail = Cypress.env("testingEmail");
const testingPassword = Cypress.env("testingPassword");

describe("Set de pruebas 'End to End' (E2E) para Sistema ERP de SELGOM S.A.", () => {
    // Lo primero que haremos, será establecer un Hook Iterativo base que realice un patrón antes de cada prueba, en este caso, el inicio de sesión.
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit(baseUrl);
        loginPage.login(testingEmail, testingPassword);
        loginPage.validateAccessToHomePage();
    });

    it("As an authenticated user, you desire to add a new product on stock - Expected state: 200", () => {
        // Accedemos a la vista de la página donde se listan los artículos.
        articlesListPage.accessArticlesList();

        // Validamos que se haya accedido correctamente a la lista de artículos.
        articlesListPage.validateArticlesListAccess();
        //articlesListPage.validateArticlesListContent(); // Validación intermedia; contenido de cada columna en la lista de artículos debe tener valor no nulo.


        // Procedemos a completar los campos del formulario para agregar un nuevo artículo por medio de fixtures.
        cy.fixture("ProductosEjemplo").then((productos) => {
            productos.forEach((producto) => {
                articlesDetailPage.accessAddNewArticlePage();
                articlesDetailPage.validateAccessToAddNewArticlePage();

                articlesDetailPage.fillArticleDetails(
                    `${producto.sku}-2`,
                    producto.description,
                    producto.stock,
                    producto.buyingCost,
                    producto.salePrice,
                    producto.measureUnit
                );

                articlesDetailPage.saveArticleDetails();
                articlesDetailPage.validateNewArticleAdded(producto.description);

                cy.wait(7000); // Esperamos a que desaparezca el toast
            });
        });
    });
});

