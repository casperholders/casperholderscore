const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    globalObject: 'this',
    libraryTarget: 'umd',
    library: '@casperholders/core',
  },
  externals: {
    'casper-js-sdk': {
      commonjs: 'casper-js-sdk',
      commonjs2: 'casper-js-sdk',
      amd: 'casper-js-sdk',
      root: 'casper-js-sdk',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
};
