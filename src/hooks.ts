import { BeforeAll, AfterAll, Before, After } from '@wdio/cucumber-framework';
import type { ITestCaseHookParameter } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

BeforeAll(async () => {
  console.log('Starting test execution...');
});

Before(async function (this: ITestCaseHookParameter) {
  console.log(`Starting scenario: ${this.pickle.name}`);

  if (browser.isMobile) {
    console.log('Running on mobile device...');
    // Differentiate appId (Android) vs bundleId (iOS)
    const appParams = browser.capabilities.platformName?.toLowerCase() === 'ios'
      ? { bundleId: process.env.IOS_APP_PACKAGE || 'com.noahcare' }
      : { appId: process.env.ANDROID_APP_PACKAGE || 'com.noahcare' };
    await browser.execute('mobile: activateApp', appParams);
  } else {
    console.log('Running on web browser...');
    await browser.url(process.env.WEB_BASE_URL || 'https://example.com');
  }
});

After(async function (this: ITestCaseHookParameter) {
  if (this.result?.status === 'FAILED') {
    console.log(`Scenario failed: ${this.pickle.name}`);

    const screenshot = await browser.takeScreenshot();

    const screenshotPath = path.join(
      process.cwd(),
      'screenshots',
      `${Date.now()}.png`
    );

    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    console.log(`Screenshot saved at: ${screenshotPath}`);
  } else {
    console.log(`Scenario passed: ${this.pickle.name}`);
  }
});

AfterAll(async () => {
  console.log('Test execution finished. Cleaning up...');

  if (browser.isMobile) {
    try {
      // Differentiate appId (Android) vs bundleId (iOS)
      const appParams = browser.capabilities.platformName?.toLowerCase() === 'ios'
        ? { bundleId: process.env.IOS_APP_PACKAGE || 'com.noahcare' }
        : { appId: process.env.ANDROID_APP_PACKAGE || 'com.noahcare' };
      await browser.execute('mobile: terminateApp', appParams);
    } catch (err) {
      console.warn('Could not terminate mobile app:', err);
    }
  } else {
    await browser.deleteSession();
  }
});