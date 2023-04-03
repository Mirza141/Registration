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
        this.accountDashboardLink = By.css('a[href="/customer/account/"]');
    }

    async navigateTo() {
        await this.driver.get(this.url);
    }

    async registerUser(userData) {
        await this.driver.findElement(this.firstNameField).sendKeys(userData.firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(userData.lastName);
        await this.driver.findElement(this.emailField).sendKeys(userData.email);
        await this.driver.findElement(this.passwordField).sendKeys(userData.password);
        await this.driver.findElement(this.confirmPasswordField).sendKeys(userData.password);
        await this.driver.findElement(this.registerButton).click();
    }


    generateUserData() {
        const firstName = `Test${Math.random().toString(36).substring(2, 6)}`;
        const lastName = `User${Math.random().toString(36).substring(2, 6)}`;
        const email = `${firstName}.${lastName}@example.com`;
        const password = `password${Math.random().toString(36).substring(2, 8)}T`;

        return { firstName, lastName, email, password };
    }

    async getSuccessMessage() {
        return await this.driver.wait(until.elementLocated(this.successMessage), 5000);
    }

    async getAccountDashboardLink() {
        return await this.driver.wait(until.elementLocated(this.accountDashboardLink), 5000);
    }
}

module.exports = RegistrationPage;
