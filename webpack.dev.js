const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: { 
    hot: true,
    static: path.resolve(__dirname, './public')
  },
  mode: 'development',
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      fix: true
    }),
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify('/')
    })
  ]
});