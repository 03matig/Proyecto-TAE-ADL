// En primer lugar, procederemos a importar el modelado de objetos en base a las vistas de la página (POM) que estaremos testeando.
const loginPage = require("./pages/login.Page")
const articlesListPage = require("./pages/articlesList.Page");
const articlesDetailPage = require("./pages/articlesDetail.Page");
const articlesEditPage = require("./pages/articlesEdit.Page");

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

    it("As an authenticated user, you desire to update an existing product on stock - Expected state: 200", () => {
        // Accedemos a la vista de la página donde se listan los artículos.
        articlesListPage.accessArticlesList();

        // Validamos que se haya accedido correctamente a la lista de artículos.
        articlesListPage.validateArticlesListAccess();
        articlesListPage.validateArticlesListContent(); // Validación intermedia; contenido de cada columna en la lista de artículos debe tener valor no nulo.

        // Para una validación posterior a la edición del artículo, guardamos el valor de la columna previo a la edición.
        articlesListPage.scrapArticleSKUCode().as("beforeSKUCode");
        articlesListPage.scrapArticleDescription().as("beforeDescription");
        articlesListPage.scrapArticleStockQuantity().as("beforeStockQuantity");
        articlesListPage.scrapArticleBuyingCost().as("beforeBuyingCost");
        articlesListPage.scrapArticleSaleCost().as("beforeSaleCost");
        articlesListPage.scrapArticleMeasureUnit().as("beforeMeasureUnit");

        // Procederemos a acceder a la página de edición del primer artículo de la lista.
        articlesListPage.clickEditFirstArticleButton();
        // Validamos que se haya accedido correctamente a la página de edición del artículo.
        articlesEditPage.validateEditArticlePageAccess();        

        // Procedemos a completar los campos del formulario para editar el artículo por medio de fixtures.
        cy.fixture("ProductosEjemplo").then((productos) => {
            const firstProduct = productos[0];

            // Para el campo de código SKU, agregaremos un sufijo "-1" para que no arroje error a la hora de editar el artículo, puesto que es el campo del ID.
            cy.get("@beforeSKUCode").then((beforeSKUCode) => {
                const newSKU = `${beforeSKUCode}-1`;
                articlesEditPage.changeSKUCodeArticleField(newSKU);
            });

            articlesEditPage.changeDescriptionArticleField(`${firstProduct.description}-2`);
            articlesEditPage.changeActualStockArticleField(firstProduct.stock);
            articlesEditPage.changeBuyingCostArticleField(firstProduct.buyingCost);
            articlesEditPage.changeSalePriceArticleField(firstProduct.salePrice);

            // Si el valor de la unidad de medida antes de los cambios es "Unidad", cambiar por "Caja".
            if (cy.get("@beforeMeasureUnit").measureUnit === "Unidad") {
                articlesEditPage.changeMeasureUnitArticleField("Caja");
            } else if (cy.get("@beforeMeasureUnit").measureUnit === "Caja") {
                articlesEditPage.changeMeasureUnitArticleField("Kg");
            } else {
                articlesEditPage.changeMeasureUnitArticleField("Unidad");
            }

            cy.wait(3000);
        });

        articlesEditPage.clickSaveChangesButton();

        // Para finalmente validar la edición del artículo, almacenamos en una variable los valores posteriores a la edición de cada campo.
        articlesListPage.scrapArticleSKUCode().as("afterSKUCode");
        articlesListPage.scrapArticleDescription().as("afterDescription");
        articlesListPage.scrapArticleStockQuantity().as("afterStockQuantity");
        articlesListPage.scrapArticleBuyingCost().as("afterBuyingCost");
        articlesListPage.scrapArticleSaleCost().as("afterSaleCost");
        articlesListPage.scrapArticleMeasureUnit().as("afterMeasureUnit");

        // Validamos que los cambios se hayan realizado correctamente.
        cy.get("@beforeSKUCode").then((beforeSKUCode) => {
            cy.get("@afterSKUCode").then((afterSKUCode) => {
                expect(afterSKUCode).to.not.eq(beforeSKUCode);
            });
        });

        cy.get("@beforeDescription").then((beforeDescription) => {
            cy.get("@afterDescription").then((afterDescription) => {
                expect(afterDescription).to.not.eq(beforeDescription);
            });
        });

        cy.get("@beforeStockQuantity").then((before) => {
            cy.get("@afterStockQuantity").then((after) => {
                expect(after).to.not.eq(before);
            });
        });

        cy.get("@beforeBuyingCost").then((before) => {
            cy.get("@afterBuyingCost").then((after) => {
                expect(after).to.not.eq(before);
            });
        });

        cy.get("@beforeSaleCost").then((before) => {
            cy.get("@afterSaleCost").then((after) => {
                expect(after).to.not.eq(before);
            });
        });

        cy.get("@beforeMeasureUnit").then((before) => {
            cy.get("@afterMeasureUnit").then((after) => {
                expect(after).to.not.eq(before);
            });
        });
    });
});