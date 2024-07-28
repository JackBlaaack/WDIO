// Task 1.

import { Selector } from 'webdriverio';

// Разработать тест со следующими шагами:

//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Loading
// - Дождаться появления каждой ссылки на странице (их 2)
// - кликнуть по ссылке Example 1: Element on page that is hidden
//   - дождаться появления кнопки start
//   - кликнуть по кнопке start
//   - дождаться появления текста "Hello World!" в теге h4 с помощью метода waitForElementWithText(), который вам надо разработать!:)

//  Создать функцию waitForElementWithText(selector, text, timeout) для ожидания определенного текста (text)
//  у элемента с определенным селектором (selector) на протяжении определенного времени (timeout):
//   - Использовать browser.waitUntil с комбинацией проверок (элемент виден и тест верный)
//   - Добавить понятный timeoutMsg, с пояснением какие проверки не пройдены и селектором элемента

async function waitForElementWithText(selector: Selector, text: string, timeout: number) {
  await browser.waitUntil(
    async () => {
      const element = await $(selector);
      return (await element.isDisplayed()) && (await element.getText()) === text;
    },
    {
      timeout: timeout,
      timeoutMsg: `Элемент с селектором ${selector} не появился или текст не соответствует "${text}"`
    }
  );
}

describe('Dynamic Loading', () => {
  const url = 'https://the-internet.herokuapp.com/';

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url(url);
    const dynamicLoadingSelector = await $('a[href="/dynamic_loading"]');
    await dynamicLoadingSelector.click();
  });
  it('Verify example links and awaits', async () => {
    const hiddenElementSelector = "a[href='/dynamic_loading/1']";
    const renderedElementAfterFactSelector = "a[href='/dynamic_loading/2']";
    const hiddenElement = await $(hiddenElementSelector);
    const renderedElementAfterFact = await $(renderedElementAfterFactSelector);
    await hiddenElement.waitForExist({
      timeoutMsg: 'Not existing element is hidden',
      timeout: 100
    });
    await renderedElementAfterFact.waitForExist({
      timeoutMsg: 'Not existing element is rendered after fact',
      timeout: 100
    });
    await hiddenElement.click();

    const headPageSelector = 'div.example h3';

    const expectedHeadPageText = 'Dynamically Loaded Page Elements';
    const headPageText = await $(headPageSelector);

    const actualHeadPageText = await headPageText.getText();

    await expect(actualHeadPageText).toBe(expectedHeadPageText);

    const startButton = await $('div#start button');

    await startButton.click();
    const headNameSelector = 'div#finish h4';
    const expectedText = 'Hello World!';

    waitForElementWithText(headNameSelector, expectedText, 5000);
  });
});
