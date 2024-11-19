# cypress-multi-environments
## Hassle-Free, No-Dependency Multiple Environment Configurations for Cypress
## Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [Cypress](https://www.cypress.io/) installed.
- TypeScript

## Environment Configuration Files

### Staging Configuration (`/cypress/env/cypress.staging.ts`)
```typescript
const stagingConfig = {
  env: {
    accounts: {
      admin: {
        username: 'adminStaging',
        password: 'passwordStaging',
      },
      user: {
        username: 'userStaging',
        password: 'passwordStaging',
      },
    },
  },
};
export default stagingConfig;
```
### Production Configuration (`/cypress/env/cypress.prod.ts`)
```typescript
const stagingConfig = {
  env: {
    accounts: {
      admin: {
        username: 'adminProd',
        password: 'passwordProd',
      },
      user: {
        username: 'userProd',
        password: 'passwordProd',
      },
    },
  },
};
export default stagingConfig;
```
### Dynamic Configuration Loader
(`/cypress/cypress.config.ts`)
```typescript
const { defineConfig } = require('cypress');
import prodConfig from './cypress/env/cypress.prod';
import stagingConfig from './cypress/env/cypress.staging';

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
```
### Using the values from the config file
```typescript
Cypress.env('accounts').admin.username
```
### Running Cypress with Different Environments
#### Use the ENV environment variable to specify the desired configuration.

```shell
ENV=staging npx cypress open
```