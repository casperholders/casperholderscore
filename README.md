# CasperHolders Core

![Documentation](https://casperholders.github.io/casperholderscore/badge.svg)
[![codecov](https://codecov.io/gh/casperholders/casperholderscore/branch/main/graph/badge.svg?token=6OTNGQO12U)](https://codecov.io/gh/casperholders/casperholderscore)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholderscore&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholderscore)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholderscore&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholderscore)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholderscore&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholderscore)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholderscore&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholderscore)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholderscore&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholderscore)

The CasperHolders website / mobile app use this library to handle any interaction with the CasperNetwork.

It contains a huge portion of the website & mobile app logic.

[API Documentation](https://casperholders.github.io/casperholderscore/)

> Version 1 & 2 are deprecated. Version 3 is actively maintained.

## Installation

### NPM

```bash
npm install @casperholders/core
```

### Yarn

```bash
yarn add @casperholders/core
```

## Example usage

```javascript
import { ClientCasper } from '@casperholders/core';

export default new ClientCasper('rpcurl');
```

When you use this lib in module mode you must transpile it. Example with a vue project:

```javascript
module.exports = {
  // ...
  transpileDependencies: [
    '@casperholders/core',
  ],
  // ...
}
```

You can find some example of the lib in the tests folders.  
However, keep in mind this is a utility lib.  
You will have to implement some abstracts class in your project if needed like the KeyManager.

## Development

Install dependencies

```bash
yarn install
```

Build

```bash
yarn build
```

Generate documentation

```bash
yarn docs
```

Run tests

```bash
yarn test
```

Run lint

```bash
yarn lint
```

## Tests

**We don't test abstracts / results / errors classes because they don't own any logic.  
We don't test the implementation of the CasperSigner because it requires full access to a browser test suite and the extension.  
We assume the Casper Signer JS SDK is battle tested to interact with the Casper Signer extension**
