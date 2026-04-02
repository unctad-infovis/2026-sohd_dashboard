const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const name = require('./package.json').name;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode:'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        terserOptions: {
          sourceMap: true,
          compress: {
            drop_console: true
          }
        },
        test: /\.js(\?.*)?$/i
      }),
      new CssMinimizerPlugin({
        test: /\.css(\?.*)?$/i
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify('https://storage.unctad.org/2026-sohd_dashboard/')
    })
  ]
});