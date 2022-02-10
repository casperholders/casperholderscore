# CasperHolders Core（核部分）

![Documentation](https://casperholders.github.io/casperholderscore/badge.svg)
[![codecov](https://codecov.io/gh/casperholders/casperholderscore/branch/main/graph/badge.svg?token=6OTNGQO12U)](https://codecov.io/gh/casperholders/casperholderscore)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholderscore&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholderscore)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholderscore&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholderscore)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholderscore&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholderscore)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholderscore&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholderscore)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholderscore&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholderscore)

CasperHoldersウェブサイトは、CasperNetworkとの疎通のためのライブラリです。

ウェブサイトの大半の理論がここにはあります。

ドキュメント : [Link](https://casperholders.github.io/casperholderscore/)

## Development（開発）

依存関係のインストール

```bash
yarn install
```

ビルド

```bash
yarn build
```

ドキュメントの生成

```bash
yarn docs
```

テストの実行

```bash
yarn test
```

## インストール

### NPM

```bash
npm install @casperholders/core
```

### Yarn

```bash
yarn add @casperholders/core
```

## サンプル

testsフォルダーには、いくつかのサンプルライブラリがあります。  
これは、実用ライブラリであることをご留意ください。  
KeyManagerの様に、いくつかの抽象クラスの実装が必要となる場合があります。

## テスト

**抽象/結果/エラークラスのテストは行いません。理論は所有していないためです。  
CasperSignerの実装テストは行いません。なぜなら、ブラウザーテストスイートと拡張機能へのフルアクセスを要するからです。  
Casper Signer JS SDKとCasper Signer拡張機能の統合には、かなり苦戦を強いられたことが想像できます。**
