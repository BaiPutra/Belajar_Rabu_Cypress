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
  it("TC-4_Verifikasi tidak dapat membuat akun untuk masuk dengan password hanya angka_(NEGATIVE)", () => {
    cy.get(account.first).type(userData.invalidUser3.firstName);
    cy.get(account.last).type(userData.invalidUser3.lastName);
    cy.get(account.email).type(randomEmail);
    cy.get(account.paswd).type(userData.invalidUser3.password);
    cy.get(account.paswdConfirm).type(userData.invalidUser3.password);
    cy.get(submit).click();
    cy.get(account.InvalidFormat)
      .should("be.visible")
      .should("contain", msg.password2);
  });

  it("TC-5_Verifikasi tidak dapat membuat akun untuk masuk dengan password dengan symbol_(NEGATIVE)", () => {
    cy.get(account.first).type(userData.invalidUser4.firstName);
    cy.get(account.last).type(userData.invalidUser4.lastName);
    cy.get(account.email).type(randomEmail);
    cy.get(account.paswd).type(userData.invalidUser4.password);
    cy.get(account.paswdConfirm).type(userData.invalidUser4.password);
    cy.get(submit).click();
    cy.get(account.InvalidFormat)
      .should("be.visible")
      .should("contain", msg.password2);
  });

  it("TC-6_Verifikasi tidak dapat membuat akun untuk masuk dengan password dengan kombinasi huruf dan angka_(NEGATIVE)", () => {
    cy.get(account.first).type(userData.invalidUser5.firstName);
    cy.get(account.last).type(userData.invalidUser5.lastName);
    cy.get(account.email).type(randomEmail);
    cy.get(account.paswd).type(userData.invalidUser5.password);
    cy.get(account.paswdConfirm).type(userData.invalidUser5.password);
    cy.get(submit).click();
    cy.get(account.InvalidFormat)
      .should("be.visible")
      .should("contain", msg.password2);
  });

  it("TC-7_Verifikasi tidak dapat membuat akun untuk masuk dengan password dengan kombinasi huruf dan symbol_(NEGATIVE)", () => {
    cy.get(account.first).type(userData.invalidUser6.firstName);
    cy.get(account.last).type(userData.invalidUser6.lastName);
    cy.get(account.email).type(randomEmail);
    cy.get(account.paswd).type(userData.invalidUser6.password);
    cy.get(account.paswdConfirm).type(userData.invalidUser6.password);
    cy.get(submit).click();
    cy.get(account.InvalidFormat)
      .should("be.visible")
      .should("contain", msg.password1);
  });

  it("TC-8_Verifikasi tidak dapat membuat akun untuk masuk dengan password dengan kombinasi angka dan symbol_(NEGATIVE)", () => {
    cy.get(account.first).type(userData.invalidUser7.firstName);
    cy.get(account.last).type(userData.invalidUser7.lastName);
    cy.get(account.email).type(randomEmail);
    cy.get(account.paswd).type(userData.invalidUser7.password);
    cy.get(account.paswdConfirm).type(userData.invalidUser7.password);
    cy.get(submit).click();
    cy.get(account.InvalidFormat)
      .should("be.visible")
      .should("contain", msg.password2);
  });

  it("TC-9_Verifikasi tidak dapat membuat akun untuk masuk jika semua kolom kosong_(NEGATIVE)", () => {
    cy.get(submit).click();
    cy.get("#form-validate").should("be.visible");
  });

  it("TC-10_Verifikasi tidak dapat membuat akun jika email sudah terdaftar_(NEGATIVE)", () => {
    cy.get(account.first).type(userData.validUser.firstName);
    cy.get(account.last).type(userData.validUser.lastName);
    cy.get(account.email).type(userData.validUser.email);
    cy.get(account.paswd).type(userData.validUser.password);
    cy.get(account.paswdConfirm).type(userData.validUser.password);
    cy.get(submit).click();
    cy.get(".message-error")
      .should("be.visible")
      .should("contain", msg.registerError3);
  });
})