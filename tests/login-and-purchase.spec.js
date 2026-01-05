import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login and Purchase Flow', () => {

  test('Login, add product, checkout and finish purchase', async ({ page }) => {

    await page.goto('/');

    await page.locator('input[name="user-name"]').fill('standard_user');
    await page.locator('input[name="password"]').fill('secret_sauce');
    await page.locator('input[name="login-button"]').click();

    await expect(page).toHaveURL(/inventory.html/);

    await page.locator('button[name="add-to-cart-sauce-labs-backpack"]').click();

    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart.html/);

    await page.locator('button[name="checkout"]').click();

    await page.locator('input[name="firstName"]').fill('Vishal');
    await page.locator('input[name="lastName"]').fill('Sankar');
    await page.locator('input[name="postalCode"]').fill('600001');
    await page.locator('input[name="continue"]').click();

    await page.locator('button[name="finish"]').click();

    const confirmationMessage = page.locator('h2[data-test="complete-header"]');
    await expect(confirmationMessage).toContainText('Thank you for your order');
  });

});
