import { Locator, Page } from "@playwright/test";

export default class EssayPage{
    constructor(private page:Page){}
    essayPageTitle:Locator=this.page.getByTestId('page-title')
    pleaseSelectEssayText:Locator=this.page.getByText('Please select the essay types you want to write about:')
    carsCheckBox:Locator=this.page.locator('//label[text()="Cars"]/parent::div/preceding-sibling::div/input[@type="checkbox"]')
    animalsCheckBox:Locator=this.page.locator('//label[text()="Animals"]/parent::div/preceding-sibling::div/input[@type="checkbox"]')
    schoolCheckBox:Locator=this.page.locator('//label[text()="School"]/parent::div/preceding-sibling::div/input[@type="checkbox"]')
    otherCheckBox:Locator=this.page.locator('//label[text()="Other"]/parent::div/preceding-sibling::div/input[@type="checkbox"]')
    essayAboutCarsText:Locator=this.page.getByText('Essay about Cars')
    essayCarsInputField:Locator=this.page.locator('//label[text()="Essay about Cars"]/following-sibling::div//textarea[@placeholder="Long Input"]')
    essayAboutAnimalsText:Locator=this.page.getByText('Essay about Animals')
    essayAnimalsInputField:Locator=this.page.locator('//label[text()="Essay about Animals"]/following-sibling::div//textarea[@placeholder="Long Input"]')
    essayAboutSchoolText:Locator=this.page.getByText('Essay about School')
    essaySchoolInputField:Locator=this.page.locator('//label[text()="Essay about School"]/following-sibling::div//textarea[@placeholder="Long Input"]')
    essayAboutOtherText:Locator=this.page.getByText('Provide an essay about any topic')
    essayOtherInputField:Locator=this.page.locator('//label[text()="Provide an essay about any topic"]/following-sibling::div//textarea[@placeholder="Long Input"]')
    saveButton:Locator=this.page.getByRole('button',{name:'Save'})
    backButton:Locator=this.page.getByRole('button',{name:'Back'})
    nextPageButton:Locator=this.page.getByRole('button',{name:'Next Page'})
}