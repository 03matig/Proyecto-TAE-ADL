class articlesList {
    elements = {
        // Prueba de acceso + validación
        sidebarEntitiesButton: () => cy.get("#root > div > aside > nav > ul > li:nth-child(2) > div > div"),
        sidebarArticlesListAccessButton: () => cy.get("#root > div > aside > nav > ul > li:nth-child(2) > div > ul > li:nth-child(3) > a"),
        articlesListViewTitle: () => cy.get("#root > div > div > main > div > div.sm\:flex.sm\:items-center > div.sm\:flex-auto > h1"),

        // Validación de contenido de la lista de artículos
        articlesListFirstElementSKUCode: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\:block > div > table > tbody > tr > td:nth-child(1)"),
        articlesListFirstElementDescription: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr > td:nth-child(2)"),
        articlesListFirstElementStockQuantity: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\:block > div > table > tbody > tr > td:nth-child(3)"),
        articlesListFirstElementBuyingCost: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\:block > div > table > tbody > tr > td:nth-child(4)"),
        articlesListFirstElementSaleCost: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\:block > div > table > tbody > tr > td:nth-child(5)"),
        articlesListFirstElementMeasureUnit: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\:block > div > table > tbody > tr > td:nth-child(6)"),
      
        // Validación de contenido para las acciones por cada artículo
        articlesListEditFirstArticleButton: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr > td.relative.py-4.pl-3.pr-4.text-sm.font-medium.text-right.whitespace-nowrap.sm\\:pr-6 > button.text-indigo-600.hover\\:text-indigo-900"),

        articlesListDeleteFirstArticleButton: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr > td.relative.py-4.pl-3.pr-4.text-sm.font-medium.text-right.whitespace-nowrap.sm\\:pr-6 > button.ml-4.text-red-600.hover\\:text-red-900")
    }

    accessArticlesList(){
        this.elements.sidebarEntitiesButton().click();
        this.elements.sidebarArticlesListAccessButton().click();
    }

    validateArticlesListAccess(){
        this.elements.articlesListViewTitle()
            .should("be.visible")
            .and("contain", "Listado de Artículos");
    }

    validateArticlesListContent(){
        this.elements.articlesListFirstElementDescription()
            .should("be.visible")
            .and(($el) => {
                expect($el.text().trim()).to.not.be.empty
            });

        this.elements.articlesListFirstElementSKUCode()
            .should("be.visible")
            .and(($el) => {
                expect($el.text().trim()).to.not.be.empty
            });

        this.elements.articlesListFirstElementDescription()
            .should("be.visible")
            .and(($el) => {
                expect($el.text().trim()).to.not.be.empty
            });

        this.elements.articlesListFirstElementStockQuantity()
            .should("be.visible")
            .and(($el) => {
                expect($el.text().trim()).to.not.be.empty
            });

        this.elements.articlesListFirstElementBuyingCost()
            .should("be.visible")
            .and(($el) => {
                expect($el.text().trim()).to.not.be.empty
            });

        this.elements.articlesListFirstElementSaleCost()
            .should("be.visible")
            .and(($el) => {
                expect($el.text().trim()).to.not.be.empty
            });

        this.elements.articlesListFirstElementMeasureUnit()
            .should("be.visible")
            .and(($el) => {
                expect($el.text().trim()).to.not.be.empty
            })

        this.elements.articlesListEditFirstArticleButton()
            .should("be.visible");

        this.elements.articlesListDeleteFirstArticleButton()
            .should("be.visible");
    }
}