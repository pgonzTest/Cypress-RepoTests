const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "env": {
      "web1": "https://reqres.in",
      "web2": "https://fakerestapi.azurewebsites.net/api"
    }
  }
});

