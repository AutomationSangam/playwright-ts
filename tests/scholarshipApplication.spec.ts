
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
import { createAccount } from "helpers/createAccount";
import testDataFaker from "src/testData/testDataFaker";

let sdetScholarshipLoginPage:SDETScholarshipLoginPage
let basicProfileDetailsPage:BasicProfileDetailsPage
let extraCurricularActivitiesPage:ExtraCurricularActivitiesPage
let highSchoolInformationPage:HighSchoolInformationPage
let essayPage:EssayPage
let reviewApplicationPage:ReviewApplicationPage
let yearOfHightSchoolGraduation:string,essayType:string
const {emailAddress,firstName,lastName,mobileNo,password}=testDataFaker.getEmailFirstNameLastNameMobileNoPassword()
const basicProfileTestData=testDataFaker.getBasicProfileTestData()
const firstActivityData=testDataFaker.getExtraCurricularActivityTestData()
const secondActivityData=testDataFaker.getExtraCurricularActivityTestData()
const highSchoolTestData=testDataFaker.getHighSchoolTestData()
const fileName:string=highSchoolTestData.fileName
const essayAboutAnimals:string=testDataFaker.getParagraph()
const essayAboutSchool:string=faker.lorem.paragraph()
test.beforeEach(async ({ page }) => {
    await page.goto('')
    sdetScholarshipLoginPage = new SDETScholarshipLoginPage(page)
    basicProfileDetailsPage = new BasicProfileDetailsPage(page)
    extraCurricularActivitiesPage = new ExtraCurricularActivitiesPage(page)
    highSchoolInformationPage = new HighSchoolInformationPage(page)
    essayPage = new EssayPage(page)
    reviewApplicationPage = new ReviewApplicationPage(page)
    await sdetScholarshipLoginPage.loginToApply.click();
})

test('Verify the SDET Scholarship Application process', async ({ page }) => {
    await test.step("Create Account", async()=>{
    await createAccount(page,emailAddress,firstName,lastName,mobileNo,password)
    })
    await test.step("Fill Basic Profile Details", async()=>{
    await expect(basicProfileDetailsPage.pageTitle).toHaveText(basicProfileConstant.basicProfilePageTitle)
    await basicProfileDetailsPage.fillBasicProfileDetails(basicProfileTestData.streetAddress,basicProfileTestData.state,basicProfileTestData.city,basicProfileTestData.zipCode,basicProfileTestData.country)
    await basicProfileDetailsPage.nextPageButton.click()
    })
    await test.step("Add Extra Curricular Activities and validate minimum entry for this field", async()=>{
    await expect(extraCurricularActivitiesPage.pageTitle).toHaveText(extraCurricularConstant.extraCurricularPageTitle) 
    await expect(extraCurricularActivitiesPage.listActivitiesParagraph).toHaveText(extraCurricularConstant.listActivitiesParagraph)
    await extraCurricularActivitiesPage.enterExtraCurricularActivityDetails(firstActivityData.activityName,firstActivityData.activityYears,firstActivityData.activityRecoginition,firstActivityData.activityDescription)
    await extraCurricularActivitiesPage.nextPageButton.click()
    await expect(extraCurricularActivitiesPage.minimumEntryError).toBeVisible()
    await extraCurricularActivitiesPage.enterExtraCurricularActivityDetails(secondActivityData.activityName,secondActivityData.activityYears,secondActivityData.activityRecoginition,secondActivityData.activityDescription)
    expect(await extraCurricularActivitiesPage.getAllAddedEntry()).toHaveLength(2)
    await extraCurricularActivitiesPage.clickOnNextPageButton()
    })
    await test.step("Add High School Information", async()=>{
    await expect(highSchoolInformationPage.highSchoolInformationTitle).toHaveText(highSchoolConstant.highSchoolPageTitle)
    await highSchoolInformationPage.fillHighSchoolForm(highSchoolTestData.highSchoolName,highSchoolTestData.highSchoolStreetAddress,highSchoolTestData.highSchoolCity,highSchoolTestData.stateName,highSchoolTestData.zipCodeForHighSchool,highSchoolTestData.gpa)
    yearOfHightSchoolGraduation=await highSchoolInformationPage.firstRandomAvailableDate()
    await expect(highSchoolInformationPage.pleaseUploadText).toHaveText(highSchoolConstant.pleaseUploadText)
    await highSchoolInformationPage.inputFile.setInputFiles(path.join(__dirname,`../docsToBeUploaded/${fileName}`))
    await highSchoolInformationPage.uploadedFileLink(fileName).waitFor({state:'visible'})
    await highSchoolInformationPage.clickOnNextPageButton()
    })
    await test.step("Add Essay for School and Animal and validate input field for all", async()=>{
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
    essayType="School"
    await expect(essayPage.essayAboutSchoolText).toBeVisible()
    await expect(essayPage.essaySchoolInputField).toBeVisible()
    await essayPage.otherCheckBox.click()
    await expect(essayPage.essayAboutOtherText).toBeVisible()
    await expect(essayPage.essayOtherInputField).toBeVisible()
    await essayPage.otherCheckBox.click()
    await expect(essayPage.essayAboutOtherText).not.toBeInViewport()
    await essayPage.animalsCheckBox.click()
    essayType=essayType+", "+"Animals"
    await essayPage.essayAnimalsInputField.fill(essayAboutAnimals)
    await essayPage.essaySchoolInputField.fill(essayAboutSchool)
    await essayPage.nextPageButton.click()
    })
    await test.step("Validating all the previously entered answers on Review Application page", async()=>{
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
    await expect(reviewApplicationPage.firstNameValue).toHaveText(firstName)
    await expect(reviewApplicationPage.lastNameValue).toHaveText(lastName)
    await expect(reviewApplicationPage.emailAddressValue).toHaveText(emailAddress.toLowerCase())
    await expect(reviewApplicationPage.streetAddressValue).toHaveText(basicProfileTestData.streetAddress)
    await expect(reviewApplicationPage.additionalStreetAddressValue).not.toBeVisible()
    await expect(reviewApplicationPage.stateValue).toHaveText(basicProfileTestData.state)
    await expect(reviewApplicationPage.cityValue).toHaveText(basicProfileTestData.city)
    await expect(reviewApplicationPage.zipCodeValue).toHaveText(basicProfileTestData.zipCode)
    await expect(reviewApplicationPage.countryValue).toHaveText(basicProfileTestData.country)
    await reviewApplicationPage.extraCurricularActivitiesText.click()
    await expect(reviewApplicationPage.getActivityElement(firstActivityData.activityName)).toBeVisible()
    await reviewApplicationPage.getActivityElement(firstActivityData.activityName).click()
    await expect(reviewApplicationPage.getExtraCurricularActivityNameElement(firstActivityData.activityName)).toBeVisible()
    await expect(reviewApplicationPage.getTotalNoOfYearsElement(firstActivityData.activityYears)).toBeVisible()
    await expect(reviewApplicationPage.getListAnyLeadershipRoleElement(firstActivityData.activityRecoginition)).toBeVisible()
    await expect(reviewApplicationPage.getDescriptionOfInvolvementElement(firstActivityData.activityDescription)).toBeVisible()
    await expect(reviewApplicationPage.getActivityElement(secondActivityData.activityName)).toBeVisible()
    await reviewApplicationPage.getActivityElement(secondActivityData.activityName).click()
    await expect(reviewApplicationPage.getExtraCurricularActivityNameElement(secondActivityData.activityName)).toBeVisible()
    await expect(reviewApplicationPage.getTotalNoOfYearsElement(secondActivityData.activityYears)).toBeVisible()
    await expect(reviewApplicationPage.getListAnyLeadershipRoleElement(secondActivityData.activityRecoginition)).toBeVisible()
    await expect(reviewApplicationPage.getDescriptionOfInvolvementElement(secondActivityData.activityDescription)).toBeVisible()
    await reviewApplicationPage.highSchoolInformationText.click()
    await expect(reviewApplicationPage.highSchoolNameValue).toHaveText(highSchoolTestData.highSchoolName)
    await expect(reviewApplicationPage.highSchoolStreetAddressValue).toHaveText(highSchoolTestData.highSchoolStreetAddress)
    await expect(reviewApplicationPage.additionalHighSchoolStreetAddressValue).not.toBeVisible()
    await expect(reviewApplicationPage.highSchoolCityValue).toHaveText(highSchoolTestData.highSchoolCity)
    await expect(reviewApplicationPage.highSchoolStateValue).toHaveText(highSchoolTestData.stateName)
    await expect(reviewApplicationPage.highSchoolZipCodeValue).toHaveText(highSchoolTestData.zipCodeForHighSchool)
    await expect(reviewApplicationPage.gpaValue).toHaveText(parseInt(highSchoolTestData.gpa).toString())
    await expect(reviewApplicationPage.yearOfHighSchoolValue).toHaveText(commonUtility.getFormattedDate(yearOfHightSchoolGraduation))
    await expect(reviewApplicationPage.getUploadedTranscriptValue(fileName)).toBeVisible()
    await reviewApplicationPage.essayText.click()
    await expect(reviewApplicationPage.selectedEssayTypeValue).toHaveText(essayType)
    await expect(reviewApplicationPage.essayAboutAnimalsValue).toHaveText(essayAboutAnimals)
    await expect(reviewApplicationPage.essayAboutSchoolValue).toHaveText(essayAboutSchool)
    })
    const url:string=page.url()
    await reviewApplicationPage.submitButton.click()
    await expect(reviewApplicationPage.applicationSubmittedText).toBeVisible()
    await expect(reviewApplicationPage.applicationSubmittedText).toHaveText(reviewApplicationConstant.applicationSubmittedText)
    await page.goto(url)
    await test.step('Validating Application page after submission and check editing is not allowed', async()=>{    
    await expect(reviewApplicationPage.reviewYourApplicationText).toBeVisible()
    await expect(reviewApplicationPage.editButtonForLetsGetToKnow).not.toBeVisible()
    await expect(reviewApplicationPage.editButtonForExtraCurricularActivities).not.toBeVisible()
    await expect(reviewApplicationPage.editButtonForHighSchoolInformation).not.toBeVisible()
    await expect(reviewApplicationPage.editButtonForEssay).not.toBeVisible()
    })
})