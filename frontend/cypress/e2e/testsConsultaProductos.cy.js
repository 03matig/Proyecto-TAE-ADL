const loginPage = require("./pages/login.Page")

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
    });

    it("Inicio de sesión y consulta de productos", () => {
        cy.get("#root > div > aside > nav > ul > li:nth-child(2) > div > div").should("be.visible").click();
        cy.get("#root > div > aside > nav > ul > li:nth-child(2) > div > ul > li:nth-child(3) > a").should("be.visible").click();
        cy.get("#root > div > div > main > div > div.sm\\:flex.sm\\:items-center > div.sm\\:flex-auto > h1").should("contain", "Listado de Artículos"); // Validación intermedia, acceso a la vista de Artículos.

        // Y establecemos las condiciones para la validación final
        cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr > td:nth-child(2)")
            .should("be.visible")
            .and(($el) => {
                expect($el.text().trim()).to.not.be.empty
            });
    });
});