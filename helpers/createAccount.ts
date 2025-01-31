import CreateAccountPage from "@pages/createAccount.page";
import KaleidoscopeSignInPage from "@pages/kaleidoscopeSignIn.page";
import SDETScholarshipLoginPage from "@pages/sdetScholarshipLanding.page";
import test, { Page } from "@playwright/test";
import commonUtility from "./commonUtility";
let sdetScholarshipLoginPage:SDETScholarshipLoginPage
let kaleidoscopeSignInPage:KaleidoscopeSignInPage
let createAccountPage:CreateAccountPage
export async function createAccount(page:Page,emailAddress:string,firstName:string,lastName:string,mobileNo:string,password:string):Promise<void>{
    kaleidoscopeSignInPage = new KaleidoscopeSignInPage(page)
    createAccountPage = new CreateAccountPage(page)
    await test.step("create account on Kaleidoscope", async()=>{
    await kaleidoscopeSignInPage.emailInputField.fill(emailAddress)
    await kaleidoscopeSignInPage.nextButton.click()
    await createAccountPage.fillTheForm(firstName,lastName,mobileNo,password)
    await createAccountPage.ageConfirmationCheckbox.click()
    await createAccountPage.submitButton.click()
    })
}