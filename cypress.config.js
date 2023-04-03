const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    failOnStatusCode: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    specPattern: "cypress/e2e/**.{js,jsx,ts,tsx}",
    excludeSpecPattern: ["**/1-getting-started", "**/2-advanced-examples"],
    failOnStatusCode: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
