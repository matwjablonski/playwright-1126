import { Page } from "@playwright/test";

export class LoginPage {
    private readonly passwordField;

    constructor(private readonly page: Page) {
        this.passwordField = this.page.getByRole('textbox', { name: 'Hasło' });
    }

    // get passwordField() {
    //     return this.page.getByRole('textbox', { name: 'Hasło' });
    // }

    get submitButton() {
        return this.page.getByRole('button', { name: 'Zaloguj' });
    }

    async login(password: string) {
        await this.passwordField.fill(password);
        await this.submitButton.press('Enter');
    }
}