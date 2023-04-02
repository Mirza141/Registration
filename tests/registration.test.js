const { Builder } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const RegistrationPage = require('../pages/RegistrationPage');
const REGISTRATION_PAGE_URL = require('../utils/constants');
const SUCCESS_MESSAGE  = require('../utils/constants');

jest.setTimeout(30000);

describe('Registration Page', () => {
    let driver;
    let registrationPage;

    beforeAll(async () => {
        const chromeOptions = new Options().addArguments('--disable-extensions', '--headless', '--disable-gpu');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        registrationPage = new RegistrationPage(driver);
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('should register a new user', async () => {
        await registrationPage.navigateTo();
        const userData = registrationPage.generateUserData();
        await registrationPage.registerUser(userData);

        expect(await registrationPage.getSuccessMessage()).toContain(SUCCESS_MESSAGE);
    });
});
