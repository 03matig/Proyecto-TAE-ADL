// step_definitions/world.js
const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld {
  constructor({ parameters }) {
    this.parameters = parameters;
  }
  async init() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async close() {
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
