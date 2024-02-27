// cypress/e2e/signin.cy.js
/// <reference types="cypress" />

import userData from "../../../fixtures/data/userData.json";
import Navigation from "../../../support/PageObject/Navigation";
import account from "../../../fixtures/data/account.json";
import msg from "../../../fixtures/data/messageData.json";

// const account = UserLocator.getCustomer();
const submit = Navigation.getSubmit();
const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;

describe("User Registration Test Suite", () => {
  beforeEach(() => {
    Navigation.visitHomepage();
    cy.clearAllCookies;
    cy.contains("Create an Account").click();
    cy.clearAllCookies;
  });

  it("TC-1_Verifikasi dapat membuat akun untuk masuk_(POSITIVE)", () => {
    cy.get(account.first).type(userData.validUser1.firstName);
    cy.get(account.last).type(userData.validUser1.lastName);
    cy.get(account.email).type(randomEmail);
    cy.get(account.paswd).type(userData.validUser1.password);
    cy.get(account.paswdConfirm).type(userData.validUser1.password);
    cy.get(submit).click();
    cy.get(account.successMessageRegist)
        .should("be.visible")
        .should("contain", msg.registerSuccess)
  });
  it("TC-02_Verifikasi tidak dapat membuat akun untuk masuk dengan invalid email_(NEGATIVE)", () => {
    cy.get(account.first).type(userData.invalidUser1.firstName);
    cy.get(account.last).type(userData.invalidUser1.lastName);
    cy.get(account.email).type(randomEmail);
    cy.get(account.paswd).type(userData.invalidUser1.password);
    cy.get(account.paswdConfirm).type("differentpassword");
    cy.get(submit).click();
    cy.get(account.ConfirmError)
        .should("be.visible")
        .should("contain", msg.passwordConfirmError)
  });
  it("TC-3_Verifikasi tidak dapat membuat akun untuk masuk dengan password hanya huruf_(NEGATIVE)", () => {
    cy.get(account.first).type(userData.invalidUser2.firstName);
    cy.get(account.last).type(userData.invalidUser2.lastName);
    cy.get(account.email).type(randomEmail);
    cy.get(account.paswd).type(userData.invalidUser2.password);
    cy.get(account.paswdConfirm).type("differentpassword");
    cy.get(submit).click();
    cy.get(account.InvalidFormat)
        .should("be.visible")
        .should("contain", msg.password2)
  });
})