
'use strict'; // eslint-disable-line strict

// Import modules
let webpack = require('webpack');
let path = require('path');

let config = require('./config');

module.exports = {

  target: 'web',
  cache: true,
  context: __dirname,
  devtool: 'none',
  debug: false,
  entry: [ config.files.client.entry ],

  output: {
    path: path.join(__dirname, 'build/static/js'),
    filename: config.files.client.out,
    chunkFilename: '[name].[id].js',
    publicPath: '/js/',
  },

  externals: {
    'source-map-support': null,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' },
      __CLIENT__: true,
      __SERVER__: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],

  babel: {
    stage: 0,
    plugins: ['jsx-control-statements/babel'],
    loose: 'all',
    blacklist: 'regenerator',
  },

  module: {
    loaders: [
      { include: /\.json$/, loaders: ['json'] },
      { include: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/ },
    ],
  },

  node: {
    fs: 'empty',
    buffer: 'empty',
    util: 'empty',
    events: 'empty',
    assert: 'empty',
  },

  resolve: {
    extensions: ['', '.jsx', '.js'],
    // root: path.resolve('.'),
  },

};


