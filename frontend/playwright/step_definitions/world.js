// step_definitions/world.js
const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld {
  constructor({ parameters }) {
    this.parameters = parameters;
  }
  async init() {
    this.browser = await chromium.launch({headless: false, slowMo: 100});
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    this.page = await this.context.newPage();
  }

  async close() {
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
