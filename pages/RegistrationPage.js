const { By, until } = require('selenium-webdriver');

class RegistrationPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://magento.softwaretestingboard.com/customer/account/create/';
        this.firstNameField = By.id('firstname');
        this.lastNameField = By.id('lastname');
        this.emailField = By.id('email_address');
        this.passwordField = By.id('password');
        this.confirmPasswordField = By.id('password-confirmation');
        this.registerButton = By.css('button[title="Create an Account"]');
        this.successMessage = By.xpath('//div[@data-ui-id="message-success"]');
    }

    async navigateTo() {
        await this.driver.get(this.url);
    }

    async register(firstName, lastName, email, password) {
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.emailField).sendKeys(email);
        await this.driver.findElement(this.passwordField).sendKeys(password);
        await this.driver.findElement(this.confirmPasswordField).sendKeys(password);
        await this.driver.findElement(this.registerButton).click();
    }

    async getSuccessMessage() {
        return await this.driver.wait(until.elementLocated(this.successMessage), 5000);
    }
}

module.exports = RegistrationPage;
