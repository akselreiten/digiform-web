import { browser, by, element } from 'protractor';

describe('Home', () => {

  beforeEach(() => {
    browser.get('/login')

    let usernameField = browser.element(by.id("username"));
    let passwordField = browser.element(by.id("password"));
    let loginButton = browser.element(by.id("login-button"));

    usernameField.sendKeys("martins")
    passwordField.sendKeys("santab")
    loginButton.click()

    browser.wait(() => {
      return true;
    }, 5000);
  });

  afterEach(() => {
    let logoutButton = browser.element(by.id("logout-button"));
    logoutButton.click();
    browser.wait(() => {
      return true;
    }, 5000);
  })


  it('should have a new application button', () => {

    let newApplicationButtonIsPresent = browser.element(by.id("new-application-button")).isPresent();
    expect(newApplicationButtonIsPresent).toEqual(true);
  });

  it('should have a top menu', () => {
    let topMenuIsPresent = browser.element(by.id("top-menu")).isPresent();
    expect(topMenuIsPresent).toEqual(true);
  });

  it('should have an application table', () => {
    let applicationTable = browser.element(by.id("application-table"));
    expect(applicationTable.isPresent()).toEqual(true);
  });

  it('should redirect to createapplication', () => {
    let button = browser.element(by.id("new-application-button"));
    button.click();


    browser.wait(() => {
      let createApplicationForm = browser.element(by.id("create-application-form"));
      return createApplicationForm.isPresent();
    }, 5000);

  });


});
