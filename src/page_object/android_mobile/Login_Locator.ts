import { $ } from '@wdio/globals';

class LoginPage {
    /**
     * Generates a dynamic locator based on the text of the element.
     * @param {string} text - The text attribute of the UI element (e.g., 'Enter email address').
     * @returns {Promise<WebdriverIO.Element>} - The locator for the element.
     */
    async getElementByText(text: string) {
        const locator = `//*[@text="${text}"]`;
        return $(locator);
    }

    /**
     * Locates an android.widget.TextView by exact text.
     */
    async getTextViewByText(text: string) {
        const locator = `//android.widget.TextView[@text="${text}"]`;
        return $(locator);
    }

    /**
     * Locator for the carousel SKIP button using UiSelector text and TextView fallback.
     */
    async getSkipButton() {
        // Primary: Android UiAutomator by text
        const uiSelector = await $('android=new UiSelector().text("SKIP")');
        if (await uiSelector.isExisting()) {
            return uiSelector;
        }
        // Fallback: Xpath TextView with text
        return this.getTextViewByText('SKIP');
    }

    /**
     * A more specific dynamic locator for input fields based on their placeholder text.
     * @param {string} placeholder - The placeholder text of the input field.
     * @returns {Promise<WebdriverIO.Element>} - The locator for the input field.
     */
    async getInputByPlaceholder(placeholder: string) {
        const locator = `//android.widget.EditText[@text="${placeholder}"]`;
        return $(locator);
    }

    /**
     * Locates the email input field by its specific placeholder text.
     * @returns {Promise<WebdriverIO.Element>} - The locator for the email input field.
     */
    async getEmailInput() {
        // Try UiSelector first, then fallback to xpath
        const ui = await $('android=new UiSelector().text("Enter email address")');
        if (await ui.isExisting()) return ui;
        const locator = `//android.widget.EditText[@text="Enter email address"]`;
        return $(locator);
    }

    /**
     * Locates a checkbox element, optionally associated with specific text (e.g., Terms and Conditions).
     * @param {string} [associatedText] - Optional text near the checkbox (e.g., 'Terms and Conditions').
     * @returns {Promise<WebdriverIO.Element>} - The locator for the checkbox.
     */
    async getCheckbox(associatedText?: string) {
        let locator;
        if (associatedText) {
            locator = `//android.widget.CheckBox[following-sibling::*[contains(@text, "${associatedText}")]] | //android.widget.CheckBox[preceding-sibling::*[contains(@text, "${associatedText}")]]`;
        } else {
            locator = `//android.widget.CheckBox`;
        }
        return $(locator);
    }

    /**
     * Password input by placeholder text using UiSelector fallback.
     */
    async getPasswordInput() {
        const ui = await $('android=new UiSelector().text("Enter password")');
        if (await ui.isExisting()) return ui;
        const locator = `//android.widget.EditText[@text="Enter password"]`;
        return $(locator);
    }

    /**
     * Terms and Conditions checkbox icon appears to be a TextView glyph "".
     * Return that element for clicking.
     */
    async getTermsCheckboxGlyph() {
        const ui = await $('android=new UiSelector().text("")');
        if (await ui.isExisting()) return ui;
        return this.getTextViewByText('');
    }

    /**
     * Login button by text.
     */
    async getLoginButton() {
        // Prefer the actionable Login button (second occurrence)
        const byUiInstance = await $('android=new UiSelector().text("Login").instance(1)');
        if (await byUiInstance.isExisting()) return byUiInstance;

        const secondTextView = await $('(//android.widget.TextView[@text="Login"])[2]');
        if (await secondTextView.isExisting()) return secondTextView;

        // Fallbacks
        const byTextView = await this.getTextViewByText('Login');
        if (await byTextView.isExisting()) return byTextView;
        return this.getElementByText('Login');
    }

    /**
     * Login screen title. Some builds show leading space in text (" Login").
     * Use normalize-space to ignore extra whitespace and UiSelector contains as fallback.
     */
    async getLoginTitle() {
        const xpath = `//android.widget.TextView[normalize-space(@text)='Login']`;
        const byXpath = await $(xpath);
        if (await byXpath.isExisting()) return byXpath;
        const byUiSelector = await $(`android=new UiSelector().className("android.widget.TextView").textContains("Login")`);
        return byUiSelector;
    }

    /**
     * Home page container: android.widget.RelativeLayout instance(1) with deep fallback xpath.
     */
    async getHomeContainer() {
        const byUi = await $('android=new UiSelector().className("android.widget.RelativeLayout").instance(1)');
        if (await byUi.isExisting()) return byUi;
        const deepXpath = '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout[2]';
        return $(deepXpath);
    }
}

export default new LoginPage();