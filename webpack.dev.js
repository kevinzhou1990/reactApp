const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Plugin = require("./app/lib/HashMapPlugin.js");
const path = require('path');

module.exports = Merge(CommonConfig, {
  // devtool: 'cheap-module-source-map',
  /*module: {
    rules: [ {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },*/
  plugins: [
    new CleanWebpackPlugin('./app/dev/'),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new Plugin()
  ],
  // devServer: {
  //   port: 9000,
  //   // host: '192.168.1.51',
  //   historyApiFallback: true,
  //   noInfo: false,
  //   stats: 'minimal',
  //   publicPath: '/',
  //   // contentBase: path.join(__dirname, './dist'),
  //   hot: true
  // },
  watch: true,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: './app/dev/',
    path: path.join(__dirname, './app/dev')
  }
});
