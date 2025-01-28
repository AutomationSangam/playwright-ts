import { Locator, Page } from "@playwright/test";

export default class ReviewApplicationPage{
    constructor(private page:Page){}
    sdetScholarShipText=this.page.locator('//span[text()="SDET Scholarship"]')
    reviewYourApplicationText=this.page.getByText('Review Your Application')
    continueApplicationLink=this.page.getByRole('link',{name:'Continue Application'})
    submitButton:Locator=this.page.getByRole('button',{name:'Submit'})
    printApplicationButton:Locator=this.page.getByRole('button',{name:'Print Application'})
    letsGetToKnowText:Locator=this.page.getByText('Lets get to know you!')
    editButtonForLetsGetToKnow:Locator=this.page.locator('//span[text()="Extracurricular Activities"]/ancestor::button//span[text()="Edit"]')
    expandButtonForLetsGetToKnow:Locator=this.page.locator('//span[text()="Lets get to know you!"]/ancestor::button/span/*[name()="svg"]')
    extraCurricularActivitiesText:Locator=this.page.locator('//span[text()="Extracurricular Activities"]')
    editButtonForExtraCurricularActivities:Locator=this.page.locator('//span[text()="Extracurricular Activities"]/ancestor::button//span[text()="Edit"]')
    expandButtonForExtraCurricularActivities:Locator=this.page.locator('//span[text()="Extracurricular Activities"]/ancestor::button/span/*[name()="svg"]')
    highSchoolInformationText:Locator=this.page.locator('//span[text()="High School Information"]')
    editButtonForHighSchoolInformation:Locator=this.page.locator('//span[text()="High School Information"]/ancestor::button//span[text()="Edit"]')
    expandButtonForHighSchoolInformation:Locator=this.page.locator('//span[text()="High School Information"]/ancestor::button/span/*[name()="svg"]')
    essayText:Locator=this.page.locator('//span[text()="Essay"]')
    editButtonForEssay:Locator=this.page.locator('//span[text()="Essay"]/ancestor::button//span[text()="Edit"]')
    expandButtonForEssay:Locator=this.page.locator('//span[text()="Essay"]/ancestor::button/span/*[name()="svg"]')
    firstNameValue:Locator=this.page.locator('//p[text()="First Name"]/following-sibling::p/span')
    lastNameValue:Locator=this.page.locator('//p[text()="Last Name"]/following-sibling::p/span')
    emailAddressValue:Locator=this.page.locator('//p[text()="Email Address"]/following-sibling::p')
    streetAddressValue:Locator=this.page.locator('//p[text()="Street Address"]/following-sibling::p/span')
    additionalStreetAddressValue:Locator=this.page.locator('//p[text()="Additional Street Address"]/following-sibling::p/span')
    stateValue:Locator=this.page.locator('//p[text()="State (Full)"]/following-sibling::p')
    cityValue:Locator=this.page.locator('//p[text()="City"]/following-sibling::p/span')
    zipCodeValue:Locator=this.page.locator('//p[text()="Zip Code"]/following-sibling::p/span')
    countryValue:Locator=this.page.locator('//p[text()="Country"]/following-sibling::p')
    highSchoolNameValue:Locator=this.page.locator('//p[text()="High School Name"]/following-sibling::p/span')
    highSchoolStreetAddressValue:Locator=this.page.locator('//p[text()="High School Street Address"]/following-sibling::p/span')
    additionalHighSchoolStreetAddressValue:Locator=this.page.locator('//p[text()="Additional High School Street Address"]/following-sibling::p/span')
    highSchoolCityValue:Locator=this.page.locator('//p[text()="High School City"]/following-sibling::p/span')
    highSchoolStateValue:Locator=this.page.locator('//p[text()="High School State (Full)"]/following-sibling::p')
    highSchoolZipCodeValue:Locator=this.page.locator('//p[text()="High School Zip Code"]/following-sibling::p')
    gpaValue:Locator=this.page.locator('//p[text()="GPA"]/following-sibling::p')
    yearOfHighSchoolValue:Locator=this.page.locator('//p[text()="Year of High School Graduation"]/following-sibling::p')
    selectedEssayTypeValue:Locator=this.page.locator('//p[text()="Please select the essay types you want to write about:"]/following-sibling::p')
    essayAboutCarsValue:Locator=this.page.locator('//p[text()="Essay about Cars"]/following-sibling::p/span')
    essayAboutAnimalsValue:Locator=this.page.locator('//p[text()="Essay about Animals"]/following-sibling::p/span')
    essayAboutSchoolValue:Locator=this.page.locator('//p[text()="Essay about School"]/following-sibling::p/span')
    essayAboutOtherValue:Locator=this.page.locator('//p[text()="Essay about Other"]/following-sibling::p/span')
    applicationSubmittedText:Locator=this.page.getByText('Application submitted, navigating')
    getActivityElement(activityName:string):Locator{
        return this.page.locator(`//button/span[contains(@class,"mantine-Accordion-label")]/span[text()="${activityName}"]`)
    }
    getExtraCurricularActivityNameElement(activityName:string):Locator{
        return this.page.locator(`//p[text()="Extracurricular Activity Name"]/following-sibling::p/span[text()="${activityName}"]`)
    }
    getTotalNoOfYearsElement(years:string):Locator{
        return this.page.locator(`//p[text()="Total Number of Years Involved"]/following-sibling::p[text()="${years}"]`)
    }
    getListAnyLeadershipRoleElement(leadershipRole:string):Locator{
        return this.page.locator(`//p[contains(text(),"List any leadership roles")]/following-sibling::p/span[text()="${leadershipRole}"]`)
    }
    getDescriptionOfInvolvementElement(description:string):Locator{
        return this.page.locator(`//p[text()="Description of Involvement"]/following-sibling::p/span[text()="${description}"]`)
    }
    getUploadedTranscriptValue(fileName:string):Locator{
        return this.page.getByRole('button',{name:fileName}).first()
    }

    

}