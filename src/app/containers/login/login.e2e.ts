import { browser, by, element } from 'protractor';

describe('Login', () => {

  browser.ignoreSynchronization = false

  beforeEach(() => {
    browser.get('/login');
  });

  it('should have a login button', () => {
    let buttonIsPresent = browser.element(by.id("login-button")).isPresent();
    expect(buttonIsPresent).toEqual(true);
  });

  it('should have a new user button', () => {
    let newUserButtonIsPresent = browser.element(by.id("new-user-button")).isPresent();
    expect(newUserButtonIsPresent).toEqual(true);
  });

  it('should have a username field', () => {
    let usernameField = browser.element(by.id("username"));
    expect(usernameField.isPresent()).toEqual(true);
  });

  it('should have a password field', () => {
    let passwordField = browser.element(by.id("password"));
    expect(passwordField.isPresent()).toEqual(true);
  });

  it('user should log in', () => {
    let usernameField = browser.element(by.id("username"));
    let passwordField = browser.element(by.id("password"));
    let loginButton = browser.element(by.id("login-button"));

    usernameField.sendKeys("martins")
    passwordField.sendKeys("santab")
    loginButton.click()

    browser.wait(() => {
      let newApplicationButton = browser.element(by.id("new-application-button"));
      return newApplicationButton.isPresent();
    }, 5000);


  });



});
