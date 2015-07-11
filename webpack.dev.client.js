
'use strict'; // eslint-disable-line strict

// Import modules
let _ = require('lodash');
let webpack = require('webpack');

// Import production webpack configuration
let webpackProdConfig = require('./webpack.client');

// Import config
let config = require('./config');

// Make sure we don't clobber our other configuration.
let webpackConfig = _.cloneDeep(webpackProdConfig);

webpackConfig.cache = true;
webpackConfig.debug = true;
webpackConfig.devtool = 'eval-source-map';

webpackConfig.plugins = [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"' },
      __CLIENT__: true,
      __SERVER__: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
];

webpackConfig.devServer = {
    publicPath: `http://localhost:${config.ports.webpack}/js/`,
    contentBase: './build/static',
    hot: true,
    inline: true,
    silent: true,
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
};

// Update output information
webpackConfig.output.publicPath = `http://localhost:${config.ports.webpack}/js/`;
webpackConfig.output.hotUpdateMainFilename = 'update/[hash]/update.json';
webpackConfig.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

// Add entry points
webpackConfig.entry.unshift(
  `webpack-dev-server/client?http://localhost:${config.ports.webpack}`,
  'webpack/hot/only-dev-server'
);

// Modify JS loader so that react-hot works
webpackConfig.module.loaders[1] = {
  include: /\.jsx?$/,
  loaders: ['react-hot', 'babel-loader'],
  exclude: /node_modules/,
};

module.exports = webpackConfig;

