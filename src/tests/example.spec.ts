// Use this line and `Show browser` (From the VS Code extension) will work as expected
// import { test, expect } from '@playwright/test';

// Use this line and `Show browser` will no longer work
import { test, expect } from '../run-with-adblock';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
