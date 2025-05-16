const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    baseUrl: 'https://www.automationexercise.com',
    chromeWebSecurity: false,
  },
  env: {
    payment_card: process.env.PAYMENT_CARD_NUMBER
  },
  fixturesFolder: 'cypress/fixtures',
  downloadsFolder: 'cypress/downloads',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos'
});