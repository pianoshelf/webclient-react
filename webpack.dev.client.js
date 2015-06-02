
'use strict'; // eslint-disable-line strict

// Import modules
let _ = require('lodash');
let webpack = require('webpack');

// Import production webpack configuration
let prodConfig = require('./webpack.client.js');

// Make sure we don't clobber our other configuration.
let config = _.cloneDeep(prodConfig);

// Modify existing properties
_.assign(config, {
  debug: true,
  devtool: 'eval-source-map',

  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
    new webpack.DefinePlugin({ __CLIENT__: true, __SERVER__: false }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  devServer: {
    publicPath: 'http://localhost:8000/js/',
    contentBase: './build/static/',
    hot: true,
    inline: true,
    quiet: true,
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
  },
});

// Update output information
config.output.publicPath = 'http://localhost:8000/js/';
config.output.hotUpdateMainFilename = 'update/[hash]/update.json';
config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

// Add entry points
config.entry.unshift(
  'webpack-dev-server/client?http://localhost:8000/js/',
  'webpack/hot/only-dev-server'
);

// Modify JS loader so that react-hot works
config.module.loaders[2] = {
  include: /\.jsx?$/,
  loaders: [ 'react-hot', 'babel-loader' ],
  exclude: /node_modules/,
};

module.exports = config;

