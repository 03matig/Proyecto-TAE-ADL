class articlesList {
    elements = {
        // Prueba de acceso + validación
        sidebarEntitiesButton: () => cy.get("#root > div > aside > nav > ul > li:nth-child(2) > div > div"),
        sidebarArticlesListAccessButton: () => cy.get("#root > div > aside > nav > ul > li:nth-child(2) > div > ul > li:nth-child(3) > a"),
        articlesListViewTitle: () => cy.get("#root > div > div > main > div > div.sm\\:flex.sm\\:items-center > div.sm\\:flex-auto > h1"),

        // Validación de contenido de la lista de artículos
        articlesListFirstElementSKUCode: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr:nth-child(1) > td:nth-child(1)"),
        articlesListFirstElementDescription: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr:nth-child(1) > td:nth-child(2)"),
        articlesListFirstElementStockQuantity: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr:nth-child(1) > td:nth-child(3)"),
        articlesListFirstElementBuyingCost: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr:nth-child(1) > td:nth-child(4)"),
        articlesListFirstElementSaleCost: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr:nth-child(1) > td:nth-child(5)"),
        articlesListFirstElementMeasureUnit: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr:nth-child(1) > td:nth-child(6)"),
      
        // Validación de contenido para las acciones por cada artículo
        articlesListEditFirstArticleButton: () => cy.get("#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr:nth-child(1) > td.relative.py-4.pl-3.pr-4.text-sm.font-medium.text-right.whitespace-nowrap.sm\\:pr-6 > button.text-indigo-600.hover\\:text-indigo-900 > svg > path"),

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

    scrapArticleSKUCode(){
        return this.elements.articlesListFirstElementSKUCode()
            .should("be.visible")
            .invoke("text")
            .then((sku) => sku.trim())
    }

    scrapArticleDescription(){
        return this.elements.articlesListFirstElementDescription()
            .should("be.visible")
            .invoke("text")
            .then((description) => description.trim())
    }

    scrapArticleStockQuantity(){
        return this.elements.articlesListFirstElementStockQuantity()
            .should("be.visible")
            .invoke("text")
            .then((stockQuantity) => stockQuantity.trim())
    }

    scrapArticleBuyingCost(){
        return this.elements.articlesListFirstElementBuyingCost()
            .should("be.visible")
            .invoke("text")
            .then((buyingCost) => buyingCost.trim())
    }

    scrapArticleSaleCost(){
        return this.elements.articlesListFirstElementSaleCost()
            .should("be.visible")
            .invoke("text")
            .then((saleCost) => saleCost.trim())
    }

    scrapArticleMeasureUnit(){
        return this.elements.articlesListFirstElementMeasureUnit()
            .should("be.visible")
            .invoke("text")
            .then((measureUnit) => measureUnit.trim())
    }

    clickEditFirstArticleButton() {
        this.elements.articlesListEditFirstArticleButton().click();
    }
}

module.exports = new articlesList();
