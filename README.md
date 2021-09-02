# CasperHolders Core

![Documentation](https://casperholders.github.io/casperholderscore/badge.svg)
[![codecov](https://codecov.io/gh/casperholders/casperholderscore/branch/main/graph/badge.svg?token=6OTNGQO12U)](https://codecov.io/gh/casperholders/casperholderscore)

The CasperHolders website use this library to handle any interaction with the CasperNetwork.

It contains a huge portion of the website logic.

Documentation : [Link](https://casperholders.github.io/casperholderscore/)

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

## Installation

### NPM

```bash
npm install @casperholders/core
```

### Yarn

```bash
yarn add @casperholders/core
```

## Examples

You can find some example of the lib in the tests folders.  
However, keep in mind this is a utility lib.  
You will have to implement some abstracts class in your project if needed like the KeyManager.

## Tests

**We don't test abstracts / results / errors classes because they don't own any logic.  
We don't test the implementation of the CasperSigner because it requires full access to a browser test suite and the extension.  
We assume the Casper Signer JS SDK is battle tested to interact with the Casper Signer extension**