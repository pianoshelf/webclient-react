
'use strict'; // eslint-disable-line strict

// Import modules
let webpack = require('webpack');
let path = require('path');

let config = require('./config');

module.exports = {

  target: 'web',
  cache: true,
  debug: false,
  devtool: 'none',
  entry: [ config.files.js.entry ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: config.files.js.out,
    chunkFilename: '[name].[id].js',
    publicPath: '/assets/',
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
    new webpack.DefinePlugin({ __CLIENT__: true, __SERVER__: false }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  ],

  module: {
    loaders: [
      {
        include: /\.json$/,
        loaders: ['json'],
      },
      {
        include: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?stage=0'],
      },
    ],
  },

  node: {
    fs: 'empty',
  },

  resolve: {
    extensions: ['', '.jsx', '.js'],
    root: path.resolve('.'),
  },

};


