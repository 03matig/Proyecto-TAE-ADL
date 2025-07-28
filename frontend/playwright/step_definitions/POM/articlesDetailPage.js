const { expect } = require('@playwright/test');

class ArticlesDetailPage {
    constructor(page) {
        this.page = page;
        this.selectors = {
            addNewArticleBtn: '#root > div > div > main > div > div.sm\\:flex.sm\\:items-center > div.mt-4.sm\\:mt-0.sm\\:ml-16.sm\\:flex-none > button',
            skuInput: '#sku',
            descriptionInput: '#name',
            stockInput: '#stock_quantity',
            buyingCostInput: '#cost_price',
            salePriceInput: '#sale_price',
            measureUnitSelect: '#unit',
            saveBtn: 'button:has-text("Guardar Cambios")',
            newArticleAddedValidationText: '#root > section > div > div'
        };
    }

    async accessAddNewArticlePage() {
        // Aseguramos de que el botón esté disponible, y esperamos a que sea visible por 10 segundos antes de hacer clic
        await expect(this.page.locator(this.selectors.addNewArticleBtn)).toBeVisible({ timeout: 10000 });  
        // Forzar scroll horizontal hasta que el botón esté visible
        await this.page.locator(this.selectors.addNewArticleBtn).scrollIntoViewIfNeeded(); // Esto ya incluye scroll horizontal si es necesario
        // Espera explícita
        await this.page.locator(this.selectors.addNewArticleBtn).click();                       // Click seguro
    }


    async validateAccessToAddNewArticlePage() {
        await expect(this.page.locator(this.selectors.skuInput)).toBeVisible();
    }

    async fillArticleDetails(sku, description, stock, buyingCost, salePrice, measureUnit) {
        await this.page.fill(this.selectors.skuInput, sku);
        await this.page.fill(this.selectors.descriptionInput, description);
        await this.page.fill(this.selectors.stockInput, stock.toString());
        await this.page.fill(this.selectors.buyingCostInput, buyingCost.toString());
        await this.page.fill(this.selectors.salePriceInput, salePrice.toString());
        // Hacer clic en el dropdown primero
        await this.page.click(this.selectors.measureUnitSelect);

        // Seleccionar el valor
        await this.page.selectOption(this.selectors.measureUnitSelect, measureUnit);
    }

    async saveArticleDetails() {
        await this.page.click(this.selectors.saveBtn);
    }

    async validateNewArticleAdded(description) {
        // Espera robusta a que aparezca el toast con el texto esperado
        await this.page.waitForFunction(
            (desc) => {
                const el = document.querySelector('#root > section > div > div');
                return el && el.innerText.includes(desc);
            },
            description,
            { timeout: 10000 }
        );

        const confirmation = this.page.locator(this.selectors.newArticleAddedValidationText);
        await expect(confirmation).toContainText(description, { timeout: 10000 });
    }
}

module.exports = ArticlesDetailPage;
