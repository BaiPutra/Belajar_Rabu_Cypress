const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporter: "reporters/custom.js",
  reporterOptions: {
    // reportDir: "cypress/results",
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    charts: true,
  },
  pageLoadTimeout: 60000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      reporter: "Test result",
        // require("cypress-mochawesome-reporter/plugin")(on);
        (config.specPattern = ["cypress/e2e/1-Belajar/Jajang/Sign_up.cy.js"]);
      return config;
    },
    viewportHeight: 768,
    viewportWidth: 1500,
    experimentalStudio: true,
  },
});