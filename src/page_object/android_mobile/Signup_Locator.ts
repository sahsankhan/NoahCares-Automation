import { $ } from '@wdio/globals';

class SignupPage {
	// ---------- Private Locators ----------

	private signupBtnUi = $('android=new UiSelector().text("Sign up")');
	private signupBtnXpath = $(`//android.widget.TextView[@text="Sign up"]`);

	private firstNameInputUi = $('android=new UiSelector().text("Enter first name")');
	private firstNameInputXpath = $(`//android.widget.EditText[@text="Enter first name"]`);

	private lastNameInputUi = $('android=new UiSelector().text("Enter last name")');
	private lastNameInputXpath = $(`//android.widget.EditText[@text="Enter last name"]`);

	private emailInputUi = $('android=new UiSelector().text("Enter email address")');
	private emailInputXpath = $(`//android.widget.EditText[@text="Enter email address"]`);

	private passwordInputUi = $('android=new UiSelector().text("Enter password").instance(0)');
	private passwordInputXpath = $(`(//android.widget.EditText[@text="Enter password"])[1]`);

	private confirmPasswordInputUi = $('android=new UiSelector().text("Enter password")');
	private confirmPasswordInputXpath = $(`//android.widget.EditText[@text="Enter password"]`);

	private phoneInputUi = $('android=new UiSelector().text("Enter phone number")');
	private phoneInputXpath = $(`//android.widget.EditText[@text="Enter phone number"]`);

	private checkboxGlyphUi = $('android=new UiSelector().text("")');
	private checkboxGlyphFallback = $(`//android.widget.TextView[@text=""]`);

	private signupAsRiderUi = $('android=new UiSelector().text("Sign Up as Rider")');
	private signupAsRiderFallback = $(`//android.widget.TextView[@text="Sign Up as Rider"]`);

	private signupLogoUi = $('android=new UiSelector().className("android.view.ViewGroup").instance(34)');
	private signupLogoXpath = $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup');

	private streetdropdown = $('android=new UiSelector().className("android.view.ViewGroup").instance(48)');

	// ---------- Public Getters (Unchanged Names) ----------

	/** Return element by exact visible text */
	async getElementByText(text: string) {
		return $(`//*[@text="${text}"]`);
	}

	/** TextView by exact text */
	async getTextViewByText(text: string) {
		return $(`//android.widget.TextView[@text="${text}"]`);
	}

	async getstreetdropdown() {
       return this.streetdropdown;
	}
	async getSignupButton() {
		if (await this.signupBtnUi.isExisting()) return this.signupBtnUi;
		return this.signupBtnXpath;
	}

	async getFirstNameInput() {
		if (await this.firstNameInputUi.isExisting()) return this.firstNameInputUi;
		return this.firstNameInputXpath;
	}

	async getLastNameInput() {
		if (await this.lastNameInputUi.isExisting()) return this.lastNameInputUi;
		return this.lastNameInputXpath;
	}

	async getEmailInput() {
		if (await this.emailInputUi.isExisting()) return this.emailInputUi;
		return this.emailInputXpath;
	}

	async getPasswordInput() {
		if (await this.passwordInputUi.isExisting()) return this.passwordInputUi;
		return this.passwordInputXpath;
	}

	async getConfirmPasswordInput() {
		if (await this.confirmPasswordInputUi.isExisting()) return this.confirmPasswordInputUi;
		return this.confirmPasswordInputXpath;
	}

	async getPhoneInput() {
		if (await this.phoneInputUi.isExisting()) return this.phoneInputUi;
		return this.phoneInputXpath;
	}

	async getCheckboxGlyph() {
		if (await this.checkboxGlyphUi.isExisting()) return this.checkboxGlyphUi;
		return this.checkboxGlyphFallback;
	}

	async getSignupAsRiderButton() {
		if (await this.signupAsRiderUi.isExisting()) return this.signupAsRiderUi;
		return this.signupAsRiderFallback;
	}

	async getSignupLogoContainer() {
		if (await this.signupLogoUi.isExisting()) return this.signupLogoUi;
		return this.signupLogoXpath;
	}
}

export default new SignupPage();
