import { When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import SignupPage from '../../../page_object/android_mobile/Signup_Locator';
import LoginPage from '../../../page_object/android_mobile/Login_Locator';

// Parameterized step for entering signup details
When('I click the signup button',async()=>{
	const signupBtn=await SignupPage.getSignupButton();
	await signupBtn.waitForDisplayed({timeout:15000});
	await signupBtn.click();
});

Then('I should see the signup page', async () => { 
	const logo = await SignupPage.getSignupLogoContainer();
	await logo.waitForDisplayed({ timeout: 15000 });
	expect(await logo.isDisplayed(), 'Signup page logo/container not visible').to.be.true;
});
var GfirstName: string;
var GlastName: string;


When(
	'I sign up with first name {string}, last name {string}, email {string}, password {string} , phone number {int}',
	async (firstName: string, lastName: string, email: string, password: string ,phone: number) => {
		
		GfirstName=firstName;
		GlastName=lastName;
		
		const firstNameInput = await SignupPage.getFirstNameInput();
		await firstNameInput.waitForDisplayed({ timeout: 15000 });
		await firstNameInput.setValue(firstName);

		const lastNameInput = await SignupPage.getLastNameInput();
		await lastNameInput.waitForDisplayed({ timeout: 15000 });
		await lastNameInput.setValue(lastName);

		const emailInput = await SignupPage.getEmailInput();
		await emailInput.waitForDisplayed({ timeout: 15000 });
		await emailInput.setValue(email);

		const phoneInput = await SignupPage.getPhoneInput();
		await phoneInput.waitForDisplayed({ timeout: 15000 });
		await phoneInput.setValue(phone); // Static valid phone number

		const pwdInput1 = await SignupPage.getPasswordInput();
		await pwdInput1.waitForDisplayed({ timeout: 15000 });
		await pwdInput1.setValue(password);

		const pwdInput2 = await SignupPage.getConfirmPasswordInput();
		await pwdInput2.waitForDisplayed({ timeout: 15000 });
		await pwdInput2.setValue(password);
	}
);

// Non-parameterized step matching your current feature wording
When('I enter the valid credentials', async () => {
	const firstNameInput = await SignupPage.getFirstNameInput();
	await firstNameInput.waitForDisplayed({ timeout: 15000 });
	await firstNameInput.setValue('John');

	const lastNameInput = await SignupPage.getLastNameInput();
	await lastNameInput.waitForDisplayed({ timeout: 15000 });
	await lastNameInput.setValue('Doe');

	const emailInput = await SignupPage.getEmailInput();
	await emailInput.waitForDisplayed({ timeout: 15000 });
	await emailInput.setValue('john.doe@email.com');

	const pwdInput1 = await SignupPage.getPasswordInput();;
	await pwdInput1.waitForDisplayed({ timeout: 15000 });
	await pwdInput1.setValue('Test@123');

	const pwdInput2 = await SignupPage.getConfirmPasswordInput();;
	await pwdInput2.waitForDisplayed({ timeout: 15000 });
	await pwdInput2.setValue('Test@123');

	const phoneInput = await SignupPage.getPhoneInput();
	await phoneInput.waitForDisplayed({ timeout: 15000 });
	await phoneInput.setValue('9876543210');
});

When('click the checkbox', async () => {
	const checkboxGlyph = await SignupPage.getCheckboxGlyph();
	await checkboxGlyph.waitForDisplayed({ timeout: 10000 });
	await checkboxGlyph.click();
});

When('click the signup as rider button', async () => {
	
	const click1= await SignupPage.getElementByText(GfirstName);
	await click1.waitForDisplayed({ timeout: 20000 });
	await click1.click();
	const click2= await SignupPage.getElementByText(GlastName);
	await click2.waitForDisplayed({ timeout: 20000 });
	await click2.click();
	const signupBtn = await SignupPage.getSignupAsRiderButton();
	await signupBtn.waitForDisplayed({ timeout: 20000 });
	await signupBtn.click();
});

Then('I successfully be signed in', async () => {
	// Reuse login page's post-auth verification (home container)
	const home = await LoginPage.getHomeContainer();
	await home.waitForDisplayed({ timeout: 20000 });
	expect(await home.isDisplayed(), 'Home screen is not visible after signup').to.be.true;
});
