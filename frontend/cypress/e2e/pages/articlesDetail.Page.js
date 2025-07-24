class articlesDetail {
    elements = {
        // Add a new article to articles list
        pageAddNewArticleButton: () => cy.get("#root > div > div > main > div > div.sm\\:flex.sm\\:items-center > div.mt-4.sm\\:mt-0.sm\\:ml-16.sm\\:flex-none > button"),
        pageAddArticleViewValidationText: () => cy.get("#root > div > div > main > div > h1"),

        // Articles Details
        skuCodeInput: () => cy.get("#sku"),
        descriptionInput: () => cy.get("#name"),
        actualStockInput: () => cy.get("#stock_quantity"),
        buyingCostInput: () => cy.get("#cost_price"),
        salePriceInput: () => cy.get("#sale_price"),
        measureUnitDropdown: () => cy.get("#unit"),
        measureUnitUnit: () => cy.get("#unit > option:nth-child(2)"),
        measureUnitBox: () => cy.get("#unit > option:nth-child(3)"),
        measureUnitKG: () => cy.get("#unit > option:nth-child(4)"),
        saveChangesButton: () => cy.get("#root > div > div > main > div > form > div.flex.justify-end.pt-6.mt-6.border-t > button.px-4.py-2.ml-3.text-sm.font-medium.text-white.bg-indigo-600.border.border-transparent.rounded-md.shadow-sm.hover\\:bg-indigo-700"),
        cancelButton: () => cy.get("#root > div > div > main > div > form > div.flex.justify-end.pt-6.mt-6.border-t > button.px-4.py-2.text-sm.font-medium.text-gray-700.bg-white.border.border-gray-300.rounded-md.shadow-sm.hover\\:bg-gray-50"),
    
        // Validate after adding a new article
        newArticleAddedValidationText: () => cy.get("#root > section > div > div")
    }

    accessAddNewArticlePage() {
        this.elements.pageAddNewArticleButton().click();
    }

    validateAccessToAddNewArticlePage() {
        this.elements.pageAddArticleViewValidationText()
            .should("be.visible")
            .and("contain", "Crear Nuevo Artículo");
    }

    fillArticleDetails(sku, description, stock, buyingCost, salePrice, measureUnit) {
        this.elements.skuCodeInput().type(sku);
        this.elements.descriptionInput().type(description);
        this.elements.actualStockInput().type(stock);
        this.elements.buyingCostInput().type(buyingCost);
        this.elements.salePriceInput().type(salePrice);
        
        if (measureUnit === "unit") {
            this.elements.measureUnitDropdown().select("Unidad");
        } else if (measureUnit === "box") {
            this.elements.measureUnitDropdown().select("Caja");
        } else if (measureUnit === "kg") {
            this.elements.measureUnitDropdown().select("Kg");
        }
    }

    saveArticleDetails() {
        this.elements.saveChangesButton().click();
    }

    validateNewArticleAdded(description){
        this.elements.newArticleAddedValidationText()
            .should("be.visible")
            .and("contain", `${description}`);
    }
}

module.exports = new articlesDetail();
