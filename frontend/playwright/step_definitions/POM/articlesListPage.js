const { expect } = require('@playwright/test');

class ArticlesListPage {
    constructor(page) {
        this.page = page;

        // Selectores
        this.selectors = {
            sidebarEntitiesButton: '#root > div > aside > nav > ul > li:nth-child(2) > div > div',
            sidebarArticlesListAccessButton: '#root > div > aside > nav > ul > li:nth-child(2) > div > ul > li:nth-child(3) > a',
            articlesListViewTitle: '#root > div > div > main > div > div.sm\\:flex.sm\\:items-center > div.sm\\:flex-auto > h1',

            articlesListFirstElementSKUCode: '#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr > td:nth-child(1)',
            articlesListFirstElementDescription: '#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr > td:nth-child(2)',
            articlesListFirstElementStockQuantity: '#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr > td:nth-child(3)',
            articlesListFirstElementBuyingCost: '#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr > td:nth-child(4)',
            articlesListFirstElementSaleCost: '#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr > td:nth-child(5)',
            articlesListFirstElementMeasureUnit: '#root > div > div > main > div > div.mt-6 > div.hidden.lg\\:block > div > table > tbody > tr > td:nth-child(6)',

            articlesListEditFirstArticleButton: 'button.text-indigo-600.hover\\:text-indigo-900',
            articlesListDeleteFirstArticleButton: 'button.ml-4.text-red-600.hover\\:text-red-900'
        };
    }

    async accessArticlesList() {
        await this.page.locator(this.selectors.sidebarEntitiesButton).click();
        await this.page.locator(this.selectors.sidebarArticlesListAccessButton).click();
    }

    async validateArticlesListAccess() {
        const title = this.page.locator(this.selectors.articlesListViewTitle);
        await title.waitFor({ state: 'visible' });
        await expect(title).toHaveText(/Listado de Artículos/);
    }

    async validateArticlesListContent() {
        const expectNotEmpty = async (locator) => {
            const el = this.page.locator(locator).first();
            await expect(el).toBeVisible();
            const text = (await el.textContent()).trim();
            expect(text).not.toEqual('');
        };

        await expectNotEmpty(this.selectors.articlesListFirstElementSKUCode);
        await expectNotEmpty(this.selectors.articlesListFirstElementDescription);
        await expectNotEmpty(this.selectors.articlesListFirstElementStockQuantity);
        await expectNotEmpty(this.selectors.articlesListFirstElementBuyingCost);
        await expectNotEmpty(this.selectors.articlesListFirstElementSaleCost);
        await expectNotEmpty(this.selectors.articlesListFirstElementMeasureUnit);

        await expect(this.page.locator(this.selectors.articlesListEditFirstArticleButton).first()).toBeVisible();
        await expect(this.page.locator(this.selectors.articlesListDeleteFirstArticleButton).first()).toBeVisible();
    }
}

module.exports = ArticlesListPage;
