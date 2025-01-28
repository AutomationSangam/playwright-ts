import { Page,Locator } from '@playwright/test';
export default class BasicProfileDetailsPage {
    constructor(private page: Page) {}
    pageTitle:Locator=this.page.getByTestId('page-title')
    pleaseFillOutFormText:Locator=this.page.getByText('Please fill out')
    firstNameField:Locator=this.page.locator('[name="contact.firstName"]')
    lastNameField:Locator=this.page.locator('[name="contact.lastName"]')
    emailField:Locator=this.page.locator('[name="contact.email"]')
    streetAddressField:Locator=this.page.getByPlaceholder('Enter your street address')
    additionalStreetAddressField:Locator=this.page.getByPlaceholder('Enter additional street address (e.g. Apt Number)')
    stateField:Locator=this.page.getByPlaceholder('Enter your state')
    cityField:Locator=this.page.getByPlaceholder('Enter your city')
    zipCodeField:Locator=this.page.getByPlaceholder('Enter your zip code')
    countryField:Locator=this.page.getByPlaceholder('Enter your country')
    nextPageButton:Locator=this.page.getByRole('button',{name:'Next Page'})

    async selectState(state:string){
        await this.stateField.click()
        const ele:Locator=this.page.getByRole('option',{name:state,exact:true})
        await ele.scrollIntoViewIfNeeded()
        await ele.click()
    }

    async selectCountry(countryName:string){
        await this.countryField.click()
        const countryNameEle:Locator=this.page.getByRole('option',{name:countryName,exact:true})
        await countryNameEle.scrollIntoViewIfNeeded()
        await countryNameEle.click()
    }
    async fillBasicProfileDetails(streetAddress:string,state:string,city:string,zipCode:string,countryName:string){
        await this.streetAddressField.fill(streetAddress)
        await this.selectState(state)
        await this.cityField.fill(city)
        await this.zipCodeField.fill(zipCode)
        await this.selectCountry(countryName)
    }   
}
