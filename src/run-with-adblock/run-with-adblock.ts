// This file is copy and pasted from https://playwright.dev/docs/chrome-extensions#testing
// With very small alterations, such as:
//  - update `pathToExtension` location
//  - removed `expect` import (as there were 2 `expect` defined)
//  - configured to use manifest v2 instead of manifest v3

import { test as base, chromium, type BrowserContext } from "@playwright/test";
import path from "path";

const pathToExtension = path.join(__dirname, "./adblock-1.46.0");

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    // for manifest v2:
    let [background] = context.backgroundPages();
    if (!background) background = await context.waitForEvent("backgroundpage");

    // // for manifest v3:
    // let [background] = context.serviceWorkers();
    // if (!background) background = await context.waitForEvent("serviceworker");

    const extensionId = background.url().split("/")[2];
    await use(extensionId);
  },
});
export const expect = test.expect;
