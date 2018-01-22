const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const modules = require('./app/modules.js');
const ExamplePlugin = require("./app/lib/ExamplePlugin.js");
const autoprefixer = require('autoprefixer');
const appDirectory = fs.realpathSync(process.cwd());

let entry = {};
let htmls = [];
for (let i = 0; i < modules.length; i++) {
  entry[modules[i]] = './app/page/' + modules[i] + '.js';
  htmls.push(new HtmlWebpackPlugin({
    filename: modules[i] + '.html',
    id: "__" + modules[i] + "__",
    moduleId: entry[modules[i]],
    template: path.join(__dirname, './app/template.ejs'),
    chunks: [modules[i]]
  }));
}

module.exports = {
  entry: {
    ...entry,
    vendor: [
      "babel-polyfill",
      'react',
      'react-dom',
      // 'jquery',
      // 'dot',
      'lodash',
      'rc-table',
      // 'node-forge',
      // 'viewerjs',
      // 'react-bootstrap-date-picker',
      'es6-promise',
      'react-bootstrap',
      'prop-types',
      'object-assign',
      'axios',
      // 'rc-table/assets/index.css',
      // './app/component/table/rc-table.css',
      // './static/assets/jquery.mloading-master/src/jquery.mloading.js',
      // './static/assets/jquery.mloading-master/src/jquery.mloading.css'
    ]
  },

  // resolve: {
  //   extensions: ['.ts', '.js', '.json'],
  //   modules: [path.join(__dirname, 'src'), 'node_modules']
  // },

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        include: path.resolve(appDirectory, 'app'),
        loader: require.resolve('babel-loader')
      }, {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      }, {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              modules: false
            }
          }, {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                // require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin('app.css'),
    ...htmls,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', minChunks: Infinity
      // filename: 'vendor.[chunkhash].js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
      // filename: 'runtime.[chunkhash].js'
    }),
    new ExamplePlugin()
  ]
};
