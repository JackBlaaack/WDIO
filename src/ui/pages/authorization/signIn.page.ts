import { IUser } from "../../../data/signIn/types/signIn.types";

const TIMEOUT_5_SECS = 5000;

export class SignIn  {

const url = 'https://anatoly-karpovich.github.io/aqa-course-project/#'

private readonly 'Email input' = '#emailinput';
private readonly 'Password input' = '#passwordinput';
private readonly 'Login button' = "//button[@type='submit' and contains(@class, 'btn-primary') and text()='Login']"



private async findElement(locator: string) {
    return await $(locator);
  }

  protected async waitForElement(locator: string, timeout = TIMEOUT_5_SECS, reverse = false) {
    const element = await this.findElement(locator);
    await element.waitForDisplayed({ timeout, reverse });
    return element;
  }


async setValue(locator:string, value: string | number, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    await element.setValue(value);
}
async fillInputs(user: IUser) {
    user.email && await this.setValue(this["Email input"], user.email)
}

}