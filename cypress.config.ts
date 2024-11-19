import {defineConfig} from "cypress";
import prodConfig from "./cypress/env/cypress.prod";
import stagingConfig from "./cypress/env/cypress.staging";

let environmentConfig = {};
switch (process.env.ENV) {
  case 'prod':
    environmentConfig = prodConfig;
    break;
  case 'staging':
    environmentConfig = stagingConfig;
    break;
  default:
    throw new Error('No environment config provided');
}

module.exports = defineConfig({
  ...environmentConfig,
  e2e: {
    setupNodeEvents(on, config) {
      console.log('%s config loaded', process.env.ENV);
      return config;
    },
  },
});
