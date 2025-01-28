import { Page,Locator } from "@playwright/test";

export default class KaleidoscopeSignInPage{
    constructor(private page: Page) {}
    public signInToKalediscope: Locator = this.page.getByText('Sign In To Kaleidoscope');
    public emailInputField: Locator = this.page.getByPlaceholder('Email Address');
    public nextButton:Locator=this.page.getByLabel('Next');
}