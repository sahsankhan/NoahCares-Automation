"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, cucumber_1.BeforeAll)(async function () {
    console.log('Starting test execution...');
});
(0, cucumber_1.Before)(async function (scenario) {
    console.log(`Starting scenario: ${scenario.pickle.name}`);
    if (browser.isMobile) {
        console.log('Running on mobile device...');
        // Differentiate appId (Android) vs bundleId (iOS)
        const appParams = browser.capabilities.platformName?.toLowerCase() === 'ios'
            ? { bundleId: process.env.IOS_APP_PACKAGE || 'com.noahcare' }
            : { appId: process.env.ANDROID_APP_PACKAGE || 'com.noahcare' };
        await browser.execute('mobile: activateApp', [appParams]);
    }
    else {
        console.log('Running on web browser...');
        await browser.url(process.env.WEB_BASE_URL || 'https://example.com');
    }
});
(0, cucumber_1.After)(async function (scenario) {
    if (scenario.result?.status === 'FAILED') {
        console.log(`Scenario failed: ${scenario.pickle.name}`);
        const screenshot = await browser.takeScreenshot();
        const screenshotPath = path_1.default.join(process.cwd(), 'screenshots', `${Date.now()}.png`);
        fs_1.default.writeFileSync(screenshotPath, screenshot, 'base64');
        console.log(`Screenshot saved at: ${screenshotPath}`);
    }
    else {
        console.log(`Scenario passed: ${scenario.pickle.name}`);
    }
});
(0, cucumber_1.AfterAll)(async function () {
    console.log('Test execution finished. Cleaning up...');
    if (browser.isMobile) {
        try {
            const appParams = browser.capabilities.platformName?.toLowerCase() === 'ios'
                ? { bundleId: process.env.IOS_APP_PACKAGE || 'com.noahcare' }
                : { appId: process.env.ANDROID_APP_PACKAGE || 'com.noahcare' };
            await browser.execute('mobile: terminateApp', [appParams]);
        }
        catch (err) {
            console.warn('Could not terminate mobile app:', err);
        }
    }
});
