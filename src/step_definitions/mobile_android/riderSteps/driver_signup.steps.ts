import { When, Then } from '@wdio/cucumber-framework';
import SignupPage from '../../../page_object/android_mobile/Signup_Locator';

When('I tap the signup as driver button', async () => {
    const signupAsDriverBtn = await SignupPage.getElementByText('Sign Up as a Driver');
    await signupAsDriverBtn.waitForDisplayed({ timeout: 15000 });
    await signupAsDriverBtn.click();
});

When('click the signup as driver button', async () => {
    const click1 = await SignupPage.getElementByText('Ahsan');
    await click1.waitForDisplayed({ timeout: 20000 });
    await click1.click();
    const click2 = await SignupPage.getElementByText('Khan');
    await click2.waitForDisplayed({ timeout: 20000 });
    await click2.click();
    const signupAsDriverBtn = await SignupPage.getElementByText('Sign Up as Driver');
    await signupAsDriverBtn.waitForDisplayed({ timeout: 15000 });
    await signupAsDriverBtn.click();
});

Then ('I should be on the next signup screen', async () => {
    const nextpage = await SignupPage.getElementByText('Driver Details');
    await nextpage.waitForDisplayed({ timeout: 15000 });
    await expect(nextpage).toBeDisplayed();

});

When('I fill the additional details', async () => {

    const gender = await SignupPage.getElementByText('Enter your gender');
    await gender.waitForDisplayed({ timeout: 15000 });
    await gender.click();
    const selectgender = await SignupPage.getElementByText('Male')
    await selectgender.waitForDisplayed({ timeout: 15000 });
    await selectgender.click();

    const street= await SignupPage.getElementByText('Enter Street');
    await street.waitForDisplayed({ timeout: 15000 });
    await street.setValue('Street, U');
    await street.click();
    browser.pause(2000);
    const selectst = await SignupPage.getElementByText('Street, UK')
    await selectst.waitForDisplayed({ timeout: 15000 });
    await selectst.click();

    const state= await SignupPage.getElementByText('Select your State');
    await state.waitForDisplayed({ timeout: 15000 });
    await state.click();
    const selectstate = await SignupPage.getElementByText('California')
    await selectstate.waitForDisplayed({ timeout: 15000 });
    await selectstate.click();

    await browser.pause(1000); // Let the UI settle before scroll

    await driver.execute('mobile: scrollGesture', {
    left: 100,
    top: 500,
    width: 800,
    height: 1200,
    direction: 'down',
    percent: 3.0
    });

    const city= await SignupPage.getElementByText('Select your City');
    await city.waitForDisplayed({ timeout: 15000 });
    await city.click();
    const selectcity = await SignupPage.getElementByText('Los Angeles')
    await selectcity.waitForDisplayed({ timeout: 15000 });
    await selectcity.click();


    const nextbtn = await SignupPage.getElementByText('Next');
    await nextbtn.waitForDisplayed({ timeout: 15000 });
    await nextbtn.click();
    
});