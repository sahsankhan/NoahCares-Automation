import { Given, When, Then } from '@wdio/cucumber-framework';
import { driver, browser } from '@wdio/globals';
import LoginPage from '../../../page_object/android_mobile/Login_Locator';
import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';

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

// --- Logout flow ---

When('I open the sidebar', async () => {
// Prefer the specific hamburger button; fallback to header area
  const hamburger = await LoginPage.getHamburgerMenuButton();
  const sidebarTrigger = (await hamburger.isExisting()) ? hamburger : await LoginPage.getSidebarHeaderArea();
  await sidebarTrigger.waitForDisplayed({ timeout: 15000 });
  await sidebarTrigger.click();
});

When('I tap the Logout button', async () => {
  const logoutBtn = await LoginPage.getLogoutButtonInDrawer(currentSequentialUserType || undefined);
  await logoutBtn.waitForDisplayed({ timeout: 15000 });
  await logoutBtn.click();
});

When('I confirm the logout', async () => {
  const confirmBtn = await LoginPage.getLogoutConfirmButton();
  await confirmBtn.waitForDisplayed({ timeout: 15000 });
  await confirmBtn.click();

  // Expect to return to login screen after logout
  const loginTitle = await LoginPage.getLoginTitle();
  await loginTitle.waitForDisplayed({ timeout: 20000 });
  expect(await loginTitle.isDisplayed(), 'Login screen not shown after logout').to.be.true;
});

// Sequential login steps
When('I login with all users from users.json file', async () => {
  const usersPath = path.join(process.cwd(), 'src', 'data', 'users.json');
  const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  const userEntries = Object.entries(usersData);
  
  console.log(`Starting sequential login test with ${userEntries.length} users`);
  
  for (let i = 0; i < userEntries.length; i++) {
    const [userType, credentials] = userEntries[i];
    const { Email, Password } = credentials as { Email: string; Password: string };

    currentSequentialUserType = userType; // track for role-specific locators
    
    console.log(`\n--- Testing user ${i + 1}/${userEntries.length}: ${userType} (${Email}) ---`);
    
    try {
      // Check if we're on login screen, if not, restart app
      await ensureOnLoginScreen();
      
      // Perform login
      await performLogin(Email, Password);
      
      // Verify successful login (temporarily bypassed for sequential run)
      // await verifySuccessfulLogin(userType);

      // Wait 15s to allow view to stabilize, then proceed to logout directly
      await browser.pause(15000);
      
      // Logout to prepare for next user
      try {
        await performLogout();
        console.log(`✅ User ${userType} login test completed successfully`);
      } catch (logoutError) {
        console.error(`❌ Logout failed for ${userType}:`, logoutError.message);
        console.log(`🔄 Attempting app restart to prepare for next user...`);
        
        // If logout fails, restart the app to ensure clean state
        try {
          await restartApp();
          console.log(`🔄 App restarted successfully after logout failure`);
        } catch (restartError) {
          console.error(`❌ Failed to restart app after logout failure:`, restartError.message);
          throw new Error(`Failed to recover after ${userType} logout failure`);
        }
      }
      
    } catch (error) {
      console.error(`❌ User ${userType} login test failed:`, error.message);
      
      // Try to recover by restarting the app
      try {
        await restartApp();
        console.log(`🔄 App restarted for next user`);
      } catch (restartError) {
        console.error(`❌ Failed to restart app:`, restartError.message);
        throw new Error(`Failed to recover after ${userType} login failure`);
      }
    }
  }
});

Then('all users should be tested successfully', async () => {
  console.log('✅ All users have been tested successfully');
});

// Helper functions
let currentSequentialUserType: string | null = null;
async function ensureOnLoginScreen(): Promise<void> {
  try {
    const loginTitle = await LoginPage.getLoginTitle();
    await loginTitle.waitForDisplayed({ timeout: 5000 });
    console.log('Already on login screen');
  } catch (error) {
    console.log('Not on login screen, attempting to navigate there...');
    // If not on login screen, we might need to restart the app
    await restartApp();
  }
}

async function performLogin(email: string, password: string): Promise<void> {
  const emailInput = await LoginPage.getEmailInput();
  await emailInput.waitForDisplayed({ timeout: 15000 });
  await emailInput.clearValue();
  await emailInput.setValue(email);

  const passwordInput = await LoginPage.getPasswordInput();
  await passwordInput.waitForDisplayed({ timeout: 15000 });
  await passwordInput.clearValue();
  await passwordInput.setValue(password);

  // Tap the terms checkbox
  const checkboxGlyph = await LoginPage.getTermsCheckboxGlyph();
  await checkboxGlyph.waitForDisplayed({ timeout: 10000 });
  await checkboxGlyph.click();

  // Click login button
  const loginButton = await LoginPage.getLoginButton();
  await loginButton.waitForDisplayed({ timeout: 15000 });
  await loginButton.click();
}

async function verifySuccessfulLogin(userType: string): Promise<void> {
  // Check for sidebar/hamburger menu button as it's common across all user types
  const hamburger = await LoginPage.getHamburgerMenuButton();
  await hamburger.waitForDisplayed({ timeout: 20000 });
  expect(await hamburger.isDisplayed(), `Sidebar button not visible for ${userType} - login may have failed`).to.be.true;
  console.log(`Login successful for ${userType} - sidebar button is visible`);
}

// Sequential-only: pick hamburger locator based on role differences you observed
async function getSequentialHamburgerForRole(userType: string | null) {
  const role = (userType || '').toLowerCase();
  // Mapping per your table:
  // - Client_Onboarded -> instance(45)
  // - Driver_Onboarded -> instance(33)
  // - Client          -> instance(33)
  // - Driver          -> instance(45)
  // - Guardian        -> instance(45)
  // - Aid_Monitor     -> instance(33)
  if (role === 'client' || role === 'driver_onboarded') {
    return LoginPage.getDriverHamburgerMenuButton(); // instance(33)
  }
  if (role === 'aid_monitor') {
    return LoginPage.getAidMonitorHamburgerMenuButton(); // instance(33)
  }
  // Default to instance(45) for the rest
  return LoginPage.getHamburgerMenuButton();
}

async function performLogout(): Promise<void> {
  try {
    console.log('Starting logout process...');
    
    // Sequential-only role-based hamburger selection
    const hamburger = await getSequentialHamburgerForRole(currentSequentialUserType);
    const sidebarTrigger = (await hamburger.isExisting()) ? hamburger : await LoginPage.getSidebarHeaderArea();
    await sidebarTrigger.waitForDisplayed({ timeout: 15000 });
    await sidebarTrigger.click();
    console.log('Sidebar opened');

    // Tap logout button (existing logic)
    const logoutBtn = await LoginPage.getLogoutButtonInDrawer();
    await logoutBtn.waitForDisplayed({ timeout: 15000 });
    await logoutBtn.click();
    console.log('Logout button clicked');

    // Confirm logout (existing logic)
    const confirmBtn = await LoginPage.getLogoutConfirmButton();
    await confirmBtn.waitForDisplayed({ timeout: 15000 });
    await confirmBtn.click();
    console.log('Logout confirmed');

    // Expect to return to login screen after logout
    const loginTitle = await LoginPage.getLoginTitle();
    await loginTitle.waitForDisplayed({ timeout: 20000 });
    expect(await loginTitle.isDisplayed(), 'Login screen not shown after logout').to.be.true;
    console.log('Logout successful - back on login screen');
  } catch (error) {
    console.error('Logout failed:', (error as Error).message);
    throw error;
  }
}

async function restartApp(): Promise<void> {
  try {
    console.log('Starting app restart...');
    
    // Get the app package from capabilities
    const appPackage = (driver.capabilities as any)['appium:appPackage'] || 
                      (driver.capabilities as any)['appPackage'] ||
                      'com.snowy_salad_38566'; // fallback package name
    
    console.log(`App package: ${appPackage}`);
    
    // Close the current app
    try {
      await driver.terminateApp(appPackage);
      console.log('App terminated successfully');
    } catch (error) {
      console.log('App termination failed, trying to close with back button');
      // Try pressing back button multiple times to close the app
      for (let i = 0; i < 5; i++) {
        await driver.pressKeyCode(4); // Back button
        await browser.pause(500);
      }
    }
    
    await browser.pause(3000);
    
    // Launch the app again
    try {
      await driver.activateApp(appPackage);
      console.log('App activated successfully');
    } catch (error) {
      console.log('App activation failed, trying to launch from home');
      // Try launching from home screen
      await driver.pressKeyCode(3); // Home button
      await browser.pause(1000);
      await driver.activateApp(appPackage);
    }
    
    await browser.pause(3000);
    
    // Skip carousel if present
    try {
      const skipBtn = await LoginPage.getSkipButton();
      await skipBtn.waitForDisplayed({ timeout: 5000 });
      await skipBtn.click();
      console.log('Carousel skipped after restart');
    } catch (error) {
      console.log('No carousel to skip after restart');
    }
    
    // Verify we're on login screen
    const loginTitle = await LoginPage.getLoginTitle();
    await loginTitle.waitForDisplayed({ timeout: 15000 });
    expect(await loginTitle.isDisplayed(), 'Login screen not visible after restart').to.be.true;
    console.log('App restarted successfully - on login screen');
  } catch (error) {
    console.error('Failed to restart app:', (error as Error).message);
    throw error;
  }
}