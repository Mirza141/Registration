const { Builder, until, By} = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const RegistrationPage = require('../pages/RegistrationPage');
const constants = require("../utils/constants");

jest.setTimeout(30000);

describe('Registration Page', () => {
    let driver;
    let registrationPage;

    beforeEach(async () => {
        const chromeOptions = new Options().addArguments('--disable-extensions', '--disable-gpu');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        registrationPage = new RegistrationPage(driver);
    });

    afterEach(async () => {
        await driver.quit();
    });

    it('should register a new user', async () => {
        await registrationPage.navigateTo();
        const userData = registrationPage.generateUserData();
        await registrationPage.registerUser(userData);

        await driver.wait(() => registrationPage.getSuccessMessage(), 5000);

        const successMessage = await registrationPage.getSuccessMessage();
        expect(await successMessage.getText()).toBe(constants.SUCCESS_MESSAGE);

    });

    it('should not register a new user with invalid email', async () => {
        await registrationPage.navigateTo();
        const userData = registrationPage.generateUserData('invalidemail');
        await registrationPage.registerUser(userData);

        await driver.wait(() => registrationPage.getEmailError(), 5000);

        const failureMessage = await registrationPage.getEmailError();
        expect(await failureMessage.getText()).toBe(constants.EMAIL_FAILURE_MESSAGE);

    });

    it('should not register a new user with invalid password', async () => {
        await registrationPage.navigateTo();
        const userData = registrationPage.generateUserData(null,"invalidpassword");
        await registrationPage.registerUser(userData);

        await driver.wait(() => registrationPage.getPasswordError(), 5000);

        const failureMessage = await registrationPage.getPasswordError();
        expect(await failureMessage.getText()).toBe(constants.PASSWORD_FAILURE_MESSAGE);

    });

    it('should not register a new user without firstName', async () => {
        await registrationPage.navigateTo();
        const userData = registrationPage.generateUserData(null,null," ");
        await registrationPage.registerUser(userData);

        await driver.wait(() => registrationPage.getFirstNameError(), 5000);

        const failureMessage = await registrationPage.getFirstNameError();
        expect(await failureMessage.getText()).toBe(constants.FIRST_NAME_FAILURE_MESSAGE);

    });

    it('should not register a new user without lastName', async () => {
        await registrationPage.navigateTo();
        const userData = registrationPage.generateUserData(null,null,null," ");
        await registrationPage.registerUser(userData);

        await driver.wait(() => registrationPage.getLastNameError(), 5000);

        const failureMessage = await registrationPage.getLastNameError();
        expect(await failureMessage.getText()).toBe(constants.LAST_NAME_FAILURE_MESSAGE);

    });

    it('should not register a new user without matching passwords', async () => {
        await registrationPage.navigateTo();
        const userData = registrationPage.generateUserData(null,null,null," ");
        await registrationPage.registerUser(userData," ");

        await driver.wait(() => registrationPage.getPasswordConfirmationError(), 5000);

        const failureMessage = await registrationPage.getPasswordConfirmationError();
        expect(await failureMessage.getText()).toBe(constants.LAST_NAME_FAILURE_MESSAGE);

    });
});