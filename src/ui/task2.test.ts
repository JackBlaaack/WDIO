// Task 2.
// Разработать тест со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя учетные данные aqacourse@gmail.com / password при этом:
//  - проверить исчезновение спиннера с помощью waitFor* методов
//  - проверить действительно ли пользователь с логином AQA User вошел в систему
//  - Прокликать каждый элемент бокового меню, убедится что после клика background-color элемента не красный

//  Рекомендации по использованию:
//  - метод $$ поиска по всем элементам
//  - for .. of  для перебора коллекции элементов
//  - метод click() для клика по элементу в цикле
//  - Проверить background-color можно двумя способами:
//     1. По CSS стилю.  element.getCSSProperty('background-color)  https://webdriver.io/docs/api/element/getCSSProperty
//     2. По отсутствию класса, отвечающего за добавление красного бэкграунда.  element.getAttribute('class') https://webdriver.io/docs/api/element/getAttribute

describe('Authorisation', () => {
  const url = 'https://anatoly-karpovich.github.io/aqa-course-project/#';

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url(url);
    const validCredentials = {
      emailAddress: 'aqacourse@gmail.com',
      password: 'password'
    };

    const emailAddress = await $('#emailinput');
    const password = await $('#passwordinput');
    const loginButton = await $('button[type = "submit"]');

    await emailAddress.setValue(validCredentials.emailAddress);
    await password.setValue(validCredentials.password);
    await loginButton.click();
  });

  it('Verify User', async () => {
    const spinnerSelector = 'div.spinner-border';
    const spinner = await $(spinnerSelector);

    await spinner.waitForDisplayed({
      timeoutMsg: 'Spinner is not displayed on the page',
      timeout: 5000,
      reverse: true
    });

    const AQAUserSelector = 'a#dropdownUser1 strong';
    const AQAUser = await $(AQAUserSelector);
    const AQAUserText = await AQAUser.getText();
    const expectedUserText = "AQA User";
    await expect(AQAUserText).toBe(expectedUserText);
const backgroundColor = "#0d6efd"
    const sidebarElements = await $$("ul.nav li");
 for (const element of sidebarElements ) {
    element.click();
    await expect(element.getCSSProperty('background-color')).toBe(backgroundColor);
 }
  });
});
