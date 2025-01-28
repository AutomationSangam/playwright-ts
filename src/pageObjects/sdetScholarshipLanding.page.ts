import { Locator, Page } from '@playwright/test';
export default class SDETScholarshipLoginPage {

  constructor(private page: Page) {
  }
  loginToApply:Locator=this.page.getByText('Log In to Apply');
  shareUrlButton:Locator = this.page.getByRole('button', { name: 'Share URL' }); 
  sdetScholarShipTextAtTile:Locator=this.page.getByTestId('program-title')
  kaledoscopeLogoAtTile:Locator=this.page.getByTestId('tile').getByAltText('Program Logo')
}
