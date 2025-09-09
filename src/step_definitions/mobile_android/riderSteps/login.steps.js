"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_framework_1 = require("@wdio/cucumber-framework");
const globals_1 = require("@wdio/globals");
const Login_Locator_1 = __importDefault(require("../../../page_object/android_mobile/Login_Locator"));
const chai_1 = require("chai");
(0, cucumber_framework_1.Given)('I have launched the NoahCare Android app', async () => {
    const apkPath = globals_1.driver.capabilities['appium:app'];
    console.log(`APK path from config: ${apkPath}`);
    const currentPackage = await globals_1.driver.getCurrentPackage();
    console.log(`App started with package: ${currentPackage}`);
    const expectedPackage = process.env.ANDROID_APP_PACKAGE || 'com.noahcare';
    if (!currentPackage.toLowerCase().includes(expectedPackage.toLowerCase())) {
        throw new Error(`Wrong app launched! Expected: ${expectedPackage}, Got: ${currentPackage}`);
    }
    await globals_1.browser.pause(5000);
});
(0, cucumber_framework_1.When)('I see the carousel screen', async () => {
    const carouselScreen = await Login_Locator_1.default.getElementByText('carouselScreen');
    (0, chai_1.expect)(await carouselScreen.isDisplayed(), 'Carousel screen is not visible').to.be.true;
});
(0, cucumber_framework_1.When)('I skip the carousel screen', async () => {
    const skipBtn = await Login_Locator_1.default.getElementByText('SKIP');
    await skipBtn.click();
});
(0, cucumber_framework_1.Then)('I should be on the login screen', async () => {
    const loginScreen = await Login_Locator_1.default.getElementByText('loginScreen');
    (0, chai_1.expect)(await loginScreen.isDisplayed(), 'Login screen is not visible').to.be.true;
});
(0, cucumber_framework_1.When)('I log in with email {string} and password {string}', async (email, password) => {
    const emailInput = await Login_Locator_1.default.getEmailInput();
    await emailInput.setValue(email);
    const passwordInput = await Login_Locator_1.default.getInputByPlaceholder('Enter password');
    await passwordInput.setValue(password);
    const checkbox = await Login_Locator_1.default.getCheckbox('Terms and Conditions');
    if (!(await checkbox.isSelected())) {
        await checkbox.click();
    }
    const loginButton = await Login_Locator_1.default.getElementByText('Login');
    await loginButton.click();
});
// ✅ Proper reuse instead of `this[...]`
(0, cucumber_framework_1.When)('I enter the valid rider credentials', async () => {
    await globals_1.browser.call(async () => {
        const emailInput = await Login_Locator_1.default.getEmailInput();
        await emailInput.setValue('newclient@yopmail.com');
        const passwordInput = await Login_Locator_1.default.getInputByPlaceholder('Enter password');
        await passwordInput.setValue('Tribute2020!');
        const checkbox = await Login_Locator_1.default.getCheckbox('Terms and Conditions');
        if (!(await checkbox.isSelected())) {
            await checkbox.click();
        }
        const loginButton = await Login_Locator_1.default.getElementByText('Login');
        await loginButton.click();
    });
});
(0, cucumber_framework_1.Then)('I should be logged in successfully', async () => {
    const dashboardScreen = await Login_Locator_1.default.getElementByText('dashboardScreen');
    (0, chai_1.expect)(await dashboardScreen.isDisplayed(), 'Dashboard screen is not visible').to.be.true;
});
