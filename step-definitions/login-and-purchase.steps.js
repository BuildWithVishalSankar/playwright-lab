const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the SauceDemo login page', async function () {
    await this.page.goto('https://www.saucedemo.com/');
});

When('I login with username {string} and password {string}', async function (username, password) {
    await this.page.fill('input[name="user-name"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('input[name="login-button"]');
});

Then('I should be navigated to the inventory page', async function () {
    await expect(this.page).toHaveURL(/inventory.html/);
});

Then('I should see an error message saying {string}', async function (message) {
    const error = this.page.locator('h3[data-test="error"]');
    await expect(error).toContainText(message);
});

When('I add a product to the cart', async function () {
    await this.page.click('button[name="add-to-cart-sauce-labs-backpack"]');
});

When('I navigate to the shopping cart', async function () {
    await this.page.click('.shopping_cart_link');
});

When('I checkout the product', async function () {
    await this.page.click('button[name="checkout"]');
});

When('I enter checkout details:', async function (dataTable) {
    const rows = dataTable.rows();
    const [firstName, lastName, postalCode] = rows[0]
    await this.page.fill('input[name="firstName"]', firstName);
    await this.page.fill('input[name="lastName"]', lastName);
    await this.page.fill('input[name="postalCode"]', postalCode);
    await this.page.click('input[name="continue"]');
});

When('I finish the purchase', async function () {
    await this.page.click('button[name="finish"]');
});

Then('I should see a confirmation message saying {string}', async function (message) {
    const confirmation = this.page.locator('h2[data-test="complete-header"]');
    await expect(confirmation).toContainText(message);
});
