import { Given, When, Then } from '@wdio/cucumber-framework';
import { driver, browser } from '@wdio/globals';
import LoginPage from '../../../page_object/android_mobile/Login_Locator';
import { expect } from 'chai';

Given('I have launched the NoahCare Android app', async () => {
  const apkPath = (driver.capabilities as any)['appium:app'];
  console.log(`APK path from config: ${apkPath}`);
  const currentPackage = await (driver as any).getCurrentPackage();
  console.log(`App started with package: ${currentPackage}`);
  const expectedPackage = process.env.ANDROID_APP_PACKAGE || 'com.noahcare';
  if (!currentPackage.toLowerCase().includes(expectedPackage.toLowerCase())) {
    throw new Error(`Wrong app launched! Expected: ${expectedPackage}, Got: ${currentPackage}`);
  }
  await browser.pause(10000);
});

When('I see the carousel screen', async function () {
  const carouselScreen = await LoginPage.getElementByText('carouselScreen');
  const isVisible = await carouselScreen.isDisplayed();
  expect(isVisible, 'Carousel screen is not visible').to.be.true;
});

When('I skip the carousel screen', async function () {
  const skipBtn = await LoginPage.getElementByText('SKIP');
  await skipBtn.click();
});

Then('I should be on the login screen', async function () {
  const loginScreen = await LoginPage.getElementByText('loginScreen');
  const loginVisible = await loginScreen.isDisplayed();
  expect(loginVisible, 'Login screen is not visible').to.be.true;
});

When('I log in with email {string} and password {string}', async function (email: string, password: string) {
  const emailInput = await LoginPage.getEmailInput();
  await emailInput.setValue(email);
  const passwordInput = await LoginPage.getInputByPlaceholder('Enter password');
  await passwordInput.setValue(password);
  const checkbox = await LoginPage.getCheckbox('Terms and Conditions');
  if (!(await checkbox.isSelected())) {
    await checkbox.click();
  }
  const loginButton = await LoginPage.getElementByText('Login');
  await loginButton.click();
});

When('I enter the valid rider credentials', async function () {
  // Reuse the existing login step with hardcoded credentials
  await this['I log in with email {string} and password {string}']('newclient@yopmail.com', 'Tribute2020!');
});

Then('I should be logged in successfully', async function () {
  const dashboardScreen = await LoginPage.getElementByText('dashboardScreen');
  const dashboardVisible = await dashboardScreen.isDisplayed();
  expect(dashboardVisible, 'Dashboard screen is not visible').to.be.true;
});