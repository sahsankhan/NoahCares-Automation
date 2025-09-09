import { Given, When, Then } from '@wdio/cucumber-framework';
import { driver, browser } from '@wdio/globals';
import LoginPage from '../../../page_object/android_mobile/Login_Locator';
import { expect } from 'chai';

Given('I have launched the NoahCare Android app', async () => {
  const apkPath = (driver.capabilities as any)['appium:app'];
  console.log(`APK path from config: ${apkPath}`);

  const currentPackage = await (driver as any).getCurrentPackage();
  console.log(`App started with package: ${currentPackage}`);

  const expectedPackage =
    ((driver.capabilities as any)['appium:appPackage'] as string) ||
    process.env.ANDROID_APP_PACKAGE ||
    'com.snowy_salad_38566';
  if (!currentPackage.toLowerCase().includes(expectedPackage.toLowerCase())) {
    throw new Error(`Wrong app launched! Expected: ${expectedPackage}, Got: ${currentPackage}`);
  }

  await browser.pause(2000);
});

When('I see the carousel screen', async () => {
  // Look for a stable indicator on the carousel screen: the SKIP button
  const skipBtn = await LoginPage.getSkipButton();
  await skipBtn.waitForDisplayed({ timeout: 15000 });
  expect(await skipBtn.isDisplayed(), 'Carousel screen is not visible').to.be.true;
});

When('I skip the carousel screen', async () => {
  const skipBtn = await LoginPage.getSkipButton();
  await skipBtn.waitForDisplayed({ timeout: 15000 });
  await skipBtn.click();
});

Then('I should be on the login screen', async () => {
  // Prefer title verification; fallback to email field
  const title = await LoginPage.getLoginTitle();
  if (await title.isExisting()) {
    await title.waitForDisplayed({ timeout: 15000 });
    expect(await title.isDisplayed(), 'Login title not visible').to.be.true;
    return;
  }
  const emailInput = await LoginPage.getEmailInput();
  await emailInput.waitForDisplayed({ timeout: 15000 });
  expect(await emailInput.isDisplayed(), 'Login screen is not visible').to.be.true;
});

When('I log in with email {string} and password {string}', async (email: string, password: string) => {
  const emailInput = await LoginPage.getEmailInput();
  await emailInput.waitForDisplayed({ timeout: 15000 });
  await emailInput.setValue(email);

  const passwordInput = await LoginPage.getPasswordInput();
  await passwordInput.waitForDisplayed({ timeout: 15000 });
  await passwordInput.setValue(password);

  // Tap the glyph acting as checkbox
  const checkboxGlyph = await LoginPage.getTermsCheckboxGlyph();
  await checkboxGlyph.waitForDisplayed({ timeout: 10000 });
  await checkboxGlyph.click();

  const loginButton = await LoginPage.getLoginButton();
  await loginButton.waitForDisplayed({ timeout: 15000 });
  await loginButton.click();
});

// ✅ Proper reuse instead of `this[...]`
When('I enter the valid rider credentials', async () => {
  await browser.call(async () => {
    const emailInput = await LoginPage.getEmailInput();
    await emailInput.waitForDisplayed({ timeout: 15000 });
    await emailInput.setValue('newclient@yopmail.com');

    const passwordInput = await LoginPage.getInputByPlaceholder('Enter password');
    await passwordInput.waitForDisplayed({ timeout: 15000 });
    await passwordInput.setValue('Tribute2020!');

    const checkbox = await LoginPage.getCheckbox('Terms and Conditions');
    if (!(await checkbox.isSelected())) {
      await checkbox.click();
    }

    const loginButton = await LoginPage.getElementByText('Login');
    await loginButton.waitForDisplayed({ timeout: 15000 });
    await loginButton.click();
  });
});

Then('I should be logged in successfully', async () => {
  // Verify home container as success criteria post-login
  const home = await LoginPage.getHomeContainer();
  await home.waitForDisplayed({ timeout: 20000 });
  expect(await home.isDisplayed(), 'Home screen is not visible').to.be.true;
});
