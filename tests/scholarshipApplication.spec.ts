
import { faker } from "@faker-js/faker";
import BasicProfileDetailsPage from "@pages/applicationProcess/basicProfileDetails.page";
import CreateAccountPage from "@pages/createAccount.page";
import EssayPage from "@pages/applicationProcess/essay.page";
import ExtraCurricularActivitiesPage from "@pages/applicationProcess/extraCurricularActivities.page";
import HighSchoolInformationPage from "@pages/applicationProcess/highSchoolInformation.page";
import KaleidoscopeSignInPage from "@pages/kaleidoscopeSignIn.page";
import ReviewApplicationPage from "@pages/applicationProcess/reviewApplication.page";
import SDETScholarshipLoginPage from "@pages/sdetScholarshipLanding.page";
import test, { expect } from "@playwright/test";
import commonUtility from "helpers/commonUtility";
import path from 'path'
import extraCurricularConstant from "@constants/extraCurricular.constant";
import highSchoolConstant from "@constants/highSchool.constant";
import reviewApplicationConstant from "@constants/reviewApplication.constant";
import testData from "src/testData/testData";
import basicProfileConstant from "@constants/basicProfile.constant";



let sdetScholarshipLoginPage:SDETScholarshipLoginPage
let kaleidoscopeSignInPage:KaleidoscopeSignInPage
let createAccountPage:CreateAccountPage
let basicProfileDetailsPage:BasicProfileDetailsPage
let extraCurricularActivitiesPage:ExtraCurricularActivitiesPage
let highSchoolInformationPage:HighSchoolInformationPage
let essayPage:EssayPage
let reviewApplicationPage:ReviewApplicationPage
test.beforeEach(async ({ page }) => {
    await page.goto('')
    sdetScholarshipLoginPage = new SDETScholarshipLoginPage(page)
    kaleidoscopeSignInPage = new KaleidoscopeSignInPage(page)
    createAccountPage = new CreateAccountPage(page)
    basicProfileDetailsPage = new BasicProfileDetailsPage(page)
    extraCurricularActivitiesPage = new ExtraCurricularActivitiesPage(page)
    highSchoolInformationPage = new HighSchoolInformationPage(page)
    essayPage = new EssayPage(page)
    reviewApplicationPage = new ReviewApplicationPage(page)
})

test('Verify the SDET Scholarship Application process', async ({ page }) => {
    await sdetScholarshipLoginPage.loginToApply.click();

    //Signup flow
    const emailAddress:string=faker.internet.email();
    await kaleidoscopeSignInPage.emailInputField.fill(emailAddress)
    await kaleidoscopeSignInPage.nextButton.click()
    const fistName:string=faker.person.firstName()
    const lastName:string=faker.person.lastName()
    const mobileNo:string=faker.number.int({min:900000000,max:999999999}).toString()
    const password:string=commonUtility.generatePassword()    
    await createAccountPage.fillTheForm(fistName,lastName,mobileNo,password)
    await createAccountPage.ageConfirmationCheckbox.click()
    await createAccountPage.submitButton.click()
    //Basic Profile Details
    await expect(basicProfileDetailsPage.pageTitle).toHaveText(basicProfileConstant.basicProfilePageTitle)
    const streetAddress:string=faker.location.streetAddress()
    const city:string=faker.location.city()
    const zipCode:string=faker.number.int({min:11111,max:99999}).toString()
    const state:string=commonUtility.getRandomElementFromArray(testData.stateList)
    const country:string=commonUtility.getRandomElementFromArray(testData.countryList)
    await basicProfileDetailsPage.fillBasicProfileDetails(streetAddress,state,city,zipCode,country)
    await basicProfileDetailsPage.nextPageButton.click()

    //Extra Curricular Activities
    await expect(extraCurricularActivitiesPage.pageTitle).toHaveText(extraCurricularConstant.extraCurricularPageTitle) 
    const extraCurricularActivities:string[]=testData.extraCurricularActivities
    const firstActivity:string=commonUtility.getRandomElementFromArray(extraCurricularActivities)
    const firstActivityYears:string=faker.number.int({min:1,max:10}).toString()
    const firstActivityRecoginition:string=faker.lorem.sentence()
    const firstActivityDescription:string=faker.lorem.paragraph()
    await expect(extraCurricularActivitiesPage.listActivitiesParagraph).toHaveText(extraCurricularConstant.listActivitiesParagraph)
    await extraCurricularActivitiesPage.enterExtraCurricularActivityDetails(firstActivity,firstActivityYears,firstActivityRecoginition,firstActivityDescription)
    await extraCurricularActivitiesPage.nextPageButton.click()
    await expect(extraCurricularActivitiesPage.minimumEntryError).toBeVisible()
    const secondActivity:string=commonUtility.getRandomElementFromArray(extraCurricularActivities)
    const secondActivityYears:string=faker.number.int({min:1,max:10}).toString()
    const secondActivityRecoginition:string=faker.person.jobTitle()
    const secondActivityDescription:string=faker.lorem.paragraph()
    await extraCurricularActivitiesPage.enterExtraCurricularActivityDetails(secondActivity,secondActivityYears,secondActivityRecoginition,secondActivityDescription)
    expect(await extraCurricularActivitiesPage.getAllAddedEntry()).toHaveLength(2)
    await extraCurricularActivitiesPage.clickOnNextPageButton()
    
    //High School Information
    await expect(highSchoolInformationPage.highSchoolInformationTitle).toHaveText(highSchoolConstant.highSchoolPageTitle)
    const highSchoolName:string=faker.company.name()
    const highSchoolStreetAddress:string=faker.location.streetAddress()
    const highSchoolCity:string=faker.location.city()
    const stateName:string=commonUtility.getRandomElementFromArray(testData.stateList)
    const zipCodeForHighSchool:string=faker.number.int({min:11111,max:99999}).toString()
    const gpa:string=faker.number.float({min:1,max:9,multipleOf:0.25}).toString()
    await highSchoolInformationPage.fillHighSchoolForm(highSchoolName,highSchoolStreetAddress,highSchoolCity,stateName,zipCodeForHighSchool,gpa)
    const yearOfHightSchoolGraduation:string=await highSchoolInformationPage.firstRandomAvailableDate()
    await expect(highSchoolInformationPage.pleaseUploadText).toHaveText(highSchoolConstant.pleaseUploadText)
    const fileName:string=testData.fileName
    await highSchoolInformationPage.inputFile.setInputFiles(path.join(__dirname,`../docsToBeUploaded/${fileName}`))
    await highSchoolInformationPage.uploadedFileLink(fileName).waitFor({state:'visible'})
    await highSchoolInformationPage.clickOnNextPageButton()
    
    //Essay
    await expect(essayPage.essayPageTitle).toHaveText('Essay')
    await essayPage.carsCheckBox.click()
    await expect(essayPage.essayAboutCarsText).toBeVisible()
    await expect(essayPage.essayCarsInputField).toBeVisible()
    await essayPage.carsCheckBox.click()
    await essayPage.animalsCheckBox.click()
    await essayPage.essayAnimalsInputField.click()
    await expect(essayPage.essayAboutAnimalsText).toBeVisible()
    await expect(essayPage.essayAnimalsInputField).toBeVisible()
    await essayPage.animalsCheckBox.click()
    await essayPage.schoolCheckBox.click()
    let essayType:string="School"
    await expect(essayPage.essayAboutSchoolText).toBeVisible()
    await expect(essayPage.essaySchoolInputField).toBeVisible()
    await essayPage.otherCheckBox.click()
    await expect(essayPage.essayAboutOtherText).toBeVisible()
    await expect(essayPage.essayOtherInputField).toBeVisible()
    await essayPage.otherCheckBox.click()
    await expect(essayPage.essayAboutOtherText).not.toBeInViewport()
    await essayPage.animalsCheckBox.click()
    essayType=essayType+", "+"Animals"
    
    const essayAboutAnimals:string=faker.lorem.paragraph()
    await essayPage.essayAnimalsInputField.fill(essayAboutAnimals)
    const essayAboutSchool:string=faker.lorem.paragraph()
    await essayPage.essaySchoolInputField.fill(essayAboutSchool)
    await essayPage.nextPageButton.click()
    //Review Application page
    await expect(reviewApplicationPage.reviewYourApplicationText).toBeVisible()

    await expect(reviewApplicationPage.sdetScholarShipText).toBeVisible()
    await expect(reviewApplicationPage.continueApplicationLink).toBeVisible()
    await expect(reviewApplicationPage.submitButton).toBeVisible()
    await expect(reviewApplicationPage.printApplicationButton).toBeVisible()
    await expect(reviewApplicationPage.editButtonForLetsGetToKnow).toBeVisible()
    await expect(reviewApplicationPage.editButtonForExtraCurricularActivities).toBeVisible()
    await expect(reviewApplicationPage.editButtonForHighSchoolInformation).toBeVisible()
    await expect(reviewApplicationPage.editButtonForEssay).toBeVisible()

    await reviewApplicationPage.letsGetToKnowText.click()
    await expect(reviewApplicationPage.firstNameValue).toHaveText(fistName)
    await expect(reviewApplicationPage.lastNameValue).toHaveText(lastName)
    await expect(reviewApplicationPage.emailAddressValue).toHaveText(emailAddress.toLowerCase())
    await expect(reviewApplicationPage.streetAddressValue).toHaveText(streetAddress)
    await expect(reviewApplicationPage.additionalStreetAddressValue).not.toBeVisible()
    await expect(reviewApplicationPage.stateValue).toHaveText(state)
    await expect(reviewApplicationPage.cityValue).toHaveText(city)
    await expect(reviewApplicationPage.zipCodeValue).toHaveText(zipCode)
    await expect(reviewApplicationPage.countryValue).toHaveText(country)

    await reviewApplicationPage.extraCurricularActivitiesText.click()
    await expect(reviewApplicationPage.getActivityElement(firstActivity)).toBeVisible()
    await reviewApplicationPage.getActivityElement(firstActivity).click()
    await expect(reviewApplicationPage.getExtraCurricularActivityNameElement(firstActivity)).toBeVisible()
    await expect(reviewApplicationPage.getTotalNoOfYearsElement(firstActivityYears)).toBeVisible()
    await expect(reviewApplicationPage.getListAnyLeadershipRoleElement(firstActivityRecoginition)).toBeVisible()
    await expect(reviewApplicationPage.getDescriptionOfInvolvementElement(firstActivityDescription)).toBeVisible()

    await expect(reviewApplicationPage.getActivityElement(secondActivity)).toBeVisible()
    await reviewApplicationPage.getActivityElement(secondActivity).click()
    await expect(reviewApplicationPage.getExtraCurricularActivityNameElement(secondActivity)).toBeVisible()
    await expect(reviewApplicationPage.getTotalNoOfYearsElement(secondActivityYears)).toBeVisible()
    await expect(reviewApplicationPage.getListAnyLeadershipRoleElement(secondActivityRecoginition)).toBeVisible()
    await expect(reviewApplicationPage.getDescriptionOfInvolvementElement(secondActivityDescription)).toBeVisible()

    await reviewApplicationPage.highSchoolInformationText.click()
    await expect(reviewApplicationPage.highSchoolNameValue).toHaveText(highSchoolName)
    await expect(reviewApplicationPage.highSchoolStreetAddressValue).toHaveText(highSchoolStreetAddress)
    await expect(reviewApplicationPage.additionalHighSchoolStreetAddressValue).not.toBeVisible()
    await expect(reviewApplicationPage.highSchoolCityValue).toHaveText(highSchoolCity)
    await expect(reviewApplicationPage.highSchoolStateValue).toHaveText(stateName)
    await expect(reviewApplicationPage.highSchoolZipCodeValue).toHaveText(zipCodeForHighSchool)
    await expect(reviewApplicationPage.gpaValue).toHaveText(parseInt(gpa).toString())
    await expect(reviewApplicationPage.yearOfHighSchoolValue).toHaveText(commonUtility.getFormattedDate(yearOfHightSchoolGraduation))
    await expect(reviewApplicationPage.getUploadedTranscriptValue(fileName)).toBeVisible()

    await reviewApplicationPage.essayText.click()
    await expect(reviewApplicationPage.selectedEssayTypeValue).toHaveText(essayType)
    await expect(reviewApplicationPage.essayAboutAnimalsValue).toHaveText(essayAboutAnimals)
    await expect(reviewApplicationPage.essayAboutSchoolValue).toHaveText(essayAboutSchool)
    const url:string= page.url()
    await reviewApplicationPage.submitButton.click()
    await expect(reviewApplicationPage.applicationSubmittedText).toBeVisible()
    await expect(reviewApplicationPage.applicationSubmittedText).toHaveText(reviewApplicationConstant.applicationSubmittedText)
    await page.goto(url)
    //Application page
    await expect(reviewApplicationPage.reviewYourApplicationText).toBeVisible()
    await expect(reviewApplicationPage.editButtonForLetsGetToKnow).not.toBeVisible()
    await expect(reviewApplicationPage.editButtonForExtraCurricularActivities).not.toBeVisible()
    await expect(reviewApplicationPage.editButtonForHighSchoolInformation).not.toBeVisible()
    await expect(reviewApplicationPage.editButtonForEssay).not.toBeVisible()
})