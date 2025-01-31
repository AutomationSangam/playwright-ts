import { faker } from "@faker-js/faker"
import commonUtility from "helpers/commonUtility"
import testData from "./testData"

class testDataFaker{

    getEmailFirstNameLastNameMobileNoPassword():{emailAddress:string,firstName:string,lastName:string,mobileNo:string,password:string}{
        const emailAddress:string=faker.internet.email()
        const firstName=faker.person.firstName()
        const lastName=faker.person.lastName()
        const mobileNo=faker.number.int({min:900000000,max:999999999}).toString()
        const password=commonUtility.generatePassword() 
        return {emailAddress,firstName,lastName,mobileNo,password}
    }
    getBasicProfileTestData():{streetAddress:string,city:string,zipCode:string,state:string,country:string}{
        const streetAddress:string=faker.location.streetAddress()
        const city:string=faker.location.city()
        const zipCode:string=faker.number.int({min:11111,max:99999}).toString()
        const state:string=commonUtility.getRandomElementFromArray(testData.stateList)
        const country:string=commonUtility.getRandomElementFromArray(testData.countryList)
        return {streetAddress,city,zipCode,state,country}
    }
    getExtraCurricularActivityTestData():{activityName:string,activityYears:string,activityRecoginition:string,activityDescription:string}{
        const activityName:string=commonUtility.getRandomElementFromArray(testData.extraCurricularActivities)
        const activityYears:string=faker.number.int({min:1,max:10}).toString()
        const activityRecoginition:string=faker.lorem.sentence()
        const activityDescription:string=faker.lorem.paragraph()
        return {activityName,activityYears,activityRecoginition,activityDescription}
    }
    /**
     * This method generate the test data for high school
     * @returns highSchoolName,highSchoolStreetAddress,highSchoolCity,stateName,zipCodeForHighSchool,gpa,fileName
     */
    getHighSchoolTestData():{highSchoolName:string,highSchoolStreetAddress:string,highSchoolCity:string,stateName:string,zipCodeForHighSchool:string,gpa:string,fileName:string}{
        const highSchoolName:string=faker.company.name()
        const highSchoolStreetAddress:string=faker.location.streetAddress()
        const highSchoolCity:string=faker.location.city()
        const stateName:string=commonUtility.getRandomElementFromArray(testData.stateList)
        const zipCodeForHighSchool:string=faker.number.int({min:11111,max:99999}).toString()
        const gpa:string=faker.number.float({min:1,max:9,multipleOf:0.25}).toString()
        const fileName:string=testData.fileName
        return {highSchoolName,highSchoolStreetAddress,highSchoolCity,stateName,zipCodeForHighSchool,gpa,fileName}
    }
    getParagraph():string{
        return faker.lorem.paragraph()
    }
}
export default new testDataFaker()