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
}

export default new LoginPage();