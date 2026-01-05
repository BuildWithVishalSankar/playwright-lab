const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
    }

    async init() {
        this.browser = await chromium.launch({ headless: false });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async cleanup() {
        try {
            if (this.page) {
                await this.page.close();
                this.page = null;
            }
            if (this.context) {
                await this.context.close();
                this.context = null;
            }
            if (this.browser) {
                await this.browser.close();
                this.browser = null;
            }
        } catch (err) {
            console.error('Error during cleanup:', err);
        }
    }
}

setWorldConstructor(CustomWorld);

Before(async function () {
    await this.init();
});

After(async function () {
    await this.cleanup();
});
