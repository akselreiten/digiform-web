import { browser, by, element } from 'protractor';

describe('Create App', () => {

  /*
   beforeEach(() => {
    browser.get('/login')

    let usernameField = browser.element(by.id("username"));
    let passwordField = browser.element(by.id("password"));
    let loginButton = browser.element(by.id("login-button"));

    usernameField.sendKeys("martins")
    passwordField.sendKeys("santab")
    loginButton.click()

    browser.wait(() => {
      let button = browser.element(by.id("new-application-button"));
      button.click();
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
*/

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


  it('should redirect to createapplication', () => {
    let button = browser.element(by.id("new-application-button"));
    button.click();


    browser.wait(() => {
      let createApplicationForm = browser.element(by.id("create-application-form"));
      return createApplicationForm.isPresent();
    }, 5000);
  });

  it('should have a ntnu subject selecter', () => {
    let ntnuSubjectSelecter = browser.element(by.id("ntnu-subject-selecter")).isPresent();
    expect(ntnuSubjectSelecter).toEqual(true);
  })


  it('redirects to login page', () => {
    let logoutButton = browser.element(by.id("logout-button"));
    logoutButton.click();
    return true;
  })


});
