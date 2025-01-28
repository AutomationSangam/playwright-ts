import {Page, Locator } from "@playwright/test";

export default class ExtraCurricularActivitiesPage{
    constructor(private page: Page) {}
    pageTitle:Locator=this.page.getByTestId('page-title')
    listActivitiesParagraph:Locator=this.page.getByText('List your extracurricular activities')
    addEntryButton:Locator=this.page.getByText('Add Entry')
    nextPageButton:Locator=this.page.getByRole('button',{name:'Next Page'})
    saveButton:Locator=this.page.getByRole('button',{name:'Save'})
    backButton:Locator=this.page.getByRole('button',{name:'Back'})
    minimumEntryError:Locator=this.page.getByText('Please add at least 2 entries')
    addEntryTextOnPopup:Locator=this.page.locator('//h2[text()="Add Entry"]')
    extraCurricularActivityNameText:Locator=this.page.getByText('Extracurricular Activity Name')
    extraCurricularActivityNameField:Locator=this.page.getByPlaceholder('Short Input')
    totalNumberOfYearsText:Locator=this.page.getByText('Total Number of Years Involved')
    totalNumberOfYearsField:Locator=this.page.getByPlaceholder('123')
    listAnyLeadershipText:Locator=this.page.getByText('List any leadership')
    listAnyLeadershipField:Locator=this.page.locator('//label[contains(text(),"List any leadership")]/following-sibling::div/textarea[@placeholder="Long Input"]')
    descriptionOfInvolvementText:Locator=this.page.getByText('Description of Involvement')
    descriptionOfInvolvementField:Locator=this.page.locator('//label[text()="Description of Involvement"]/following-sibling::div/textarea[@placeholder="Long Input"]')
    addButton:Locator=this.page.getByRole('button',{name:'Add',exact:true})
    
    async getAllEditButton():Promise<Locator[]>{
        return await this.page.locator('svg.tabler-icon-edit').all()
    }
    async getAllDeleteButton():Promise<Locator[]>{
        return await this.page.locator('svg.tabler-icon-trash').all()
    }
    async getAllAddedEntry():Promise<Locator[]>{
        return await this.page.locator('//span[text()="Add Entry"]/ancestor::button/parent::div/following-sibling::div//p').all()
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

    async enterExtraCurricularActivityDetails(activityName:string,years:string,leadershipRole:string,description:string){
        await this.addEntryButton.click()
        await this.addEntryTextOnPopup.waitFor({state:'visible'})
        await this.extraCurricularActivityNameField.fill(activityName)
        await this.totalNumberOfYearsField.fill(years)
        await this.listAnyLeadershipField.fill(leadershipRole)
        await this.descriptionOfInvolvementField.fill(description)
        await this.addButton.click()
    }
};