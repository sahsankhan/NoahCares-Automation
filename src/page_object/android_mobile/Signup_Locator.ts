import { $ } from '@wdio/globals';

class SignupPage {
	/** Return element by exact visible text */
	async getElementByText(text: string) {
		return $(`//*[@text="${text}"]`);
	}

	/** TextView by exact text */
	async getTextViewByText(text: string) {
		return $(`//android.widget.TextView[@text="${text}"]`);
	}

	/** First name input */
	async getFirstNameInput() {
		const ui = await $('android=new UiSelector().text("Enter first name")');
		if (await ui.isExisting()) return ui;
		return $(`//android.widget.EditText[@text="Enter first name"]`);
	}

	/** Last name input */
	async getLastNameInput() {
		const ui = await $('android=new UiSelector().text("Enter last name")');
		if (await ui.isExisting()) return ui;
		return $(`//android.widget.EditText[@text="Enter last name"]`);
	}

	/** Email input */
	async getEmailInput() {
		const ui = await $('android=new UiSelector().text("Enter email address")');
		if (await ui.isExisting()) return ui;
		return $(`//android.widget.EditText[@text="Enter email address"]`);
	}

	/** Password inputs (two instances). Provide index 0 or 1. */
	async getPasswordInput(instanceIndex: 0 | 1 = 0) {
		const byUi = await $(`android=new UiSelector().text("Enter password").instance(${instanceIndex})`);
		if (await byUi.isExisting()) return byUi;
		// Fallback: nth match of EditText with same text
		const nth = instanceIndex + 1;
		return $(`(//android.widget.EditText[@text="Enter password"][${nth}])`);
	}

	/** Phone number input */
	async getPhoneInput() {
		const ui = await $('android=new UiSelector().text("Enter phone number")');
		if (await ui.isExisting()) return ui;
		return $(`//android.widget.EditText[@text="Enter phone number"]`);
	}

	/** Checkbox glyph (appears as special TextView character) */
	async getCheckboxGlyph() {
		const ui = await $('android=new UiSelector().text("")');
		if (await ui.isExisting()) return ui;
		return this.getTextViewByText('');
	}

	/** Sign Up as Rider button */
	async getSignupAsRiderButton() {
		const ui = await $('android=new UiSelector().text("Sign Up as Rider")');
		if (await ui.isExisting()) return ui;
		return this.getTextViewByText('Sign Up as Rider');
	}

	/** Verify Signup page logo/container using given className+instance and xpath fallback */
	async getSignupLogoContainer() {
		const byUi = await $('android=new UiSelector().className("android.view.ViewGroup").instance(34)');
		if (await byUi.isExisting()) return byUi;
		const byXpath = await $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup');
		return byXpath;
	}
}

export default new SignupPage();
