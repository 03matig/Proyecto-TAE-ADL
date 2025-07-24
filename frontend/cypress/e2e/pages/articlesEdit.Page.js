class articlesEdit {
    elements = {
        editArticleValidationText: () => cy.get("#root > div > div > main > div > h1"),

        // Article Details
        skuCodeInput: () => cy.get("#sku"),
        descriptionInput: () => cy.get("#name"),
        actualStockInput: () => cy.get("#stock_quantity"),
        buyingCostInput: () => cy.get("#cost_price"),
        salePriceInput: () => cy.get("#sale_price"),
        measureUnitDropdown: () => cy.get("#unit"),

        saveChangesButton: () => cy.get("#root > div > div > main > div > form > div.flex.justify-end.pt-6.mt-6.border-t > button.px-4.py-2.ml-3.text-sm.font-medium.text-white.bg-indigo-600.border.border-transparent.rounded-md.shadow-sm.hover\\:bg-indigo-700"),
        cancelButton: () => cy.get("#root > div > div > main > div > form > div.flex.justify-end.pt-6.mt-6.border-t > button.px-4.py-2.text-sm.font-medium.text-gray-700.bg-white.border.border-gray-300.rounded-md.shadow-sm.hover\\:bg-gray-50"),

        // Validate after editing an article
        articleEditedValidationText: () => cy.get("#root > section > div > div")
    }

    validateEditArticlePageAccess() {
        this.elements.editArticleValidationText()
            .should("be.visible")
            .and("have.text", "Editar Artículo");
    }

    changeSKUCodeArticleField(value) {
        this.elements.skuCodeInput().clear().type(value);
    }

    changeDescriptionArticleField(value) {
        this.elements.descriptionInput().clear().type(value);
    }

    changeActualStockArticleField(value) {
        this.elements.actualStockInput().clear().type(value);
    }

    changeBuyingCostArticleField(value) {
        this.elements.buyingCostInput().clear().type(value);
    }

    changeSalePriceArticleField(value) {
        this.elements.salePriceInput().clear().type(value);
    }

    changeMeasureUnitArticleField(value) {
        this.elements.measureUnitDropdown().select(value);
    }

    clickSaveChangesButton() {
        this.elements.saveChangesButton().click();
    }

    validateArticleEdited(description) {
        this.elements.articleEditedValidationText()
            .should("be.visible")
            .and("contain", `Artículo ${description} editado correctamente`);
    }
}

module.exports = new articlesEdit();