import { Page,Locator } from '@playwright/test';
import CommonUtility from 'helpers/commonUtility';
export default class HighSchoolInformationPage{
    constructor(private page: Page) {}
    highSchoolInformationTitle:Locator=this.page.getByTestId('page-title')
    highSchoolNameText:Locator=this.page.getByText('High School Name')
    highSchoolNameField:Locator=this.page.locator('[name="contact.highSchoolName"]')
    highSchoolStreetAddressText:Locator=this.page.getByText('High School Street Address')
    highSchoolStreetAddressField:Locator=this.page.locator('[name="contact.highSchoolAddress"]')
    additionalHighSchoolStreetAddressText:Locator=this.page.getByText('Additional High School Street Address')
    additionalHighSchoolStreetAddressField:Locator=this.page.locator('[name="contact.highSchoolAddress1"]')
    highSchholCityText:Locator=this.page.getByText('High School City')
    highSchoolCityField:Locator=this.page.locator('[name="contact.highSchoolCity"]')
    highSchoolStateText:Locator=this.page.getByText('High School State (Full)')
    highSchoolStateField:Locator=this.page.getByPlaceholder('Enter high school state')
    highSchoolZipCodeText:Locator=this.page.getByText('High School Zip Code')
    highSchoolZipCodeField:Locator=this.page.getByPlaceholder('e.g. 55413')
    gpaText:Locator=this.page.getByText('GPA')
    gpaField:Locator=this.page.getByPlaceholder('Enter your current GPA')
    yearOfHightSchoolGraduationText:Locator=this.page.getByText('Year of High School Graduation')
    yearOfHightSchoolGraduationField:Locator=this.page.getByPlaceholder('Enter a date')
    transcriptUploadText:Locator=this.page.getByText('Transcript Upload')
    pleaseUploadText:Locator=this.page.locator('[data-testid="sublabel"] p')
    uploadFileButton:Locator=this.page.getByRole('button',{name:'Upload File'})
    chooseExistingFileButton:Locator=this.page.getByRole('button',{name:'Choose Existing File'})
    thisFieldRequiredError:Locator=this.page.getByText('This field is required')
    nextPageButton:Locator=this.page.getByRole('button',{name:'Next Page'})
    saveButton:Locator=this.page.getByRole('button',{name:'Save'})
    backButton:Locator=this.page.getByRole('button',{name:'Back'})
    previousMonthButton:Locator=this.page.locator('button[data-direction="previous"]').first()
    inputFile:Locator=this.page.locator('//span[text()="Upload File"]/ancestor::button/following-sibling::input')
    async selectHighSchoolState(stateName:string){
        await this.highSchoolStateField.click()
        const ele:Locator=this.page.getByRole('option',{name:stateName})
        await ele.scrollIntoViewIfNeeded()
        await ele.click()
    }
    async firstRandomAvailableDate():Promise<string>{
        await this.yearOfHightSchoolGraduationField.click()
        await this.previousMonthButton.click()
        let dates=await this.page.locator('//td[contains(@class,"mantine-DateInput-monthCel")]/button[not(@data-outside)]').all()
        const randomArrayIndex:number=Math.floor(Math.random() * dates.length)
        let randomDate=await dates[randomArrayIndex].getAttribute('aria-label')
        await dates[randomArrayIndex].click()
        return randomDate
    }
    uploadedFileLink(fileName:string):Locator{
        return  this.page.getByRole('button',{name:fileName})
    }
    async clickOnNextPageButton(){
        let currentUrl:string= this.page.url()
        let newUrl:string=""
        do{
            await this.nextPageButton.click()
            await this.page.waitForTimeout(3000)
            newUrl= this.page.url()
        }while(currentUrl===newUrl)
    }
    async fillHighSchoolForm(highSchoolName:string,highSchoolStreetAddress:string,highSchoolCity:string,highSchoolState:string,highSchoolZipCode:string,gpa:string){
        await this.highSchoolNameField.fill(highSchoolName)
        await this.highSchoolStreetAddressField.fill(highSchoolStreetAddress)
        await this.highSchoolCityField.fill(highSchoolCity)
        await this.selectHighSchoolState(highSchoolState)
        await this.highSchoolZipCodeField.fill(highSchoolZipCode)
        await this.gpaField.fill(gpa)
    }
}