import { Page,Locator } from '@playwright/test';
export default class CreateAccountPage {
    constructor(private page: Page) {}
    emailField:Locator=this.page.getByLabel('Email Address')
    firstNameField:Locator=this.page.getByLabel('First Name')
    lastNameField:Locator=this.page.getByLabel('Last Name')
    mobilePhoneNoField:Locator=this.page.locator('[type="tel"]')
    createAPasswordField:Locator=this.page.getByLabel('Create a Password')
    ageConfirmationCheckbox:Locator=this.page.getByLabel('I confirm that I am at least 13 years old')
    smsNotificationCheckbox:Locator=this.page.getByLabel('Opt-in to program related SMS notifications')
    emailNotificationCheckbox:Locator=this.page.getByLabel('Opt-in to email notifications about your application status')
    promotionalEmailsCheckbox:Locator=this.page.getByLabel('Opt-in to promotional emails')
    submitButton:Locator=this.page.getByRole('button',{name:'Submit'})
    backButton:Locator=this.page.getByLabel('Back button')
    registeredSuccessfullyMessage:Locator=this.page.getByText('Registered successfully.')
    async fillTheForm(fistName:string,lastName:string,mobilePhoneNo:string,password:string){
        await this.firstNameField.fill(fistName)
        await this.lastNameField.fill(lastName) 
        await this.mobilePhoneNoField.fill(mobilePhoneNo)
        await this.createAPasswordField.fill(password)
    }
}