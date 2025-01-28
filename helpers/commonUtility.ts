import { faker } from "@faker-js/faker";

class CommonUtility{
     generatePassword() {
        const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./';
        const randomSpecialChar = specialChars.charAt(Math.floor(Math.random() * specialChars.length));
        const randomUppercase = faker.string.alpha({ length: 1 }).toUpperCase();
        const randomLowercase = faker.string.alpha({ length: 1 }).toLowerCase();
        const randomNumber = faker.number.int({ min: 0, max: 9 });
      
        // Combine the generated characters 
        const password = 
          randomSpecialChar + 
          randomUppercase + 
          randomLowercase + 
          randomNumber + 
          faker.string.alphanumeric({ length: 6 }); // Add more random characters for stronger password
      
        return password;
      }
      getRandomElementFromArray(array:string[]){
        return array[Math.floor(Math.random() * array.length)];
      }
      getFormattedDate(dateStr:string){
        const dateObj = new Date(dateStr);
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-based month
        const day = dateObj.getDate().toString().padStart(2, '0');
        const year = dateObj.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
      }
}
export default new CommonUtility();