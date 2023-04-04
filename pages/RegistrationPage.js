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
        this.emailAddressError = By.xpath('//div[@id=\'email_address-error\']');
        this.passwordError = By.xpath('//div[@id=\'password-error\']');
        this.firstNameError = By.xpath('//div[@id=\'firstname-error\']');
        this.lastNameError = By.xpath('//div[@id=\'lastname-error\']');
        this.passwordConfirmationError = By.xpath('//div[@id=\'password-confirmation-error\']');
    }

    async navigateTo() {
        await this.driver.get(this.url);
    }

    async registerUser(userData, confirmationPassword=null) {
        await this.driver.findElement(this.firstNameField).sendKeys(userData.firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(userData.lastName);
        await this.driver.findElement(this.emailField).sendKeys(userData.email);
        await this.driver.findElement(this.passwordField).sendKeys(userData.password);
        await this.driver.findElement(this.confirmPasswordField).sendKeys(confirmationPassword ? confirmationPassword : userData.password);
        await this.driver.findElement(this.registerButton).click();
    }


    generateUserData(email=null, password= null, firstName=null, lastName=null) {
        const validFirstName = `Test${Math.random().toString(36).substring(2, 6)}`;
        const validLastName = `User${Math.random().toString(36).substring(2, 6)}`;
        const validEmail = `${firstName}.${lastName}@example.com`;
        const validPassword = `password${Math.random().toString(36).substring(2, 8)}T`;

        // Generate invalid inputs if provided
        const generatedFirstName = firstName ? firstName : validFirstName;
        const generatedLastName = lastName ? lastName : validLastName;
        const generatedEmail = email ? email : validEmail;
        const generatedPassword = password ? password : validPassword;

        return { firstName: generatedFirstName, lastName: generatedLastName, email: generatedEmail, password: generatedPassword };
    }

    async getSuccessMessage() {
        return await this.driver.wait(until.elementLocated(this.successMessage), 5000);
    }

    async getEmailError() {
        return await this.driver.wait(until.elementLocated(this.emailAddressError), 5000);
    }

    async getPasswordError() {
        return await this.driver.wait(until.elementLocated(this.passwordError), 5000);
    }

    async getFirstNameError() {
        return await this.driver.wait(until.elementLocated(this.firstNameError), 5000);
    }

    async getLastNameError() {
        return await this.driver.wait(until.elementLocated(this.lastNameError), 5000);
    }

    async getPasswordConfirmationError() {
        return await this.driver.wait(until.elementLocated(this.passwordConfirmationError), 5000);
    }

}

module.exports = RegistrationPage;