'use strict';

let _ = require('lodash');
let webpack = require('webpack');

let prodConfig = require('./webpack.client.js');

// Make sure we don't change our other configuration.
let config = _.cloneDeep(prodConfig);

// Modify existing properties
_.assign(config, {
  debug: true,
  devtool: 'eval-source-map',

  output: {
    publicPath: 'http://localhost:8000/js/',
    hotUpdateMainFilename: 'update/[hash]/update.json',
    hotUpdateChunkFilename: 'update/[hash]/[id].update.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        IS_CLIENT: 'true'
      }
    }),
	new webpack.DefinePlugin({ __CLIENT__: true, __SERVER__: false }),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
  ],

  devServer: {
    publicPath: 'http://localhost:8000/js/',
    contentBase: './build/static/',
    hot: true,
    inline: true,
    quiet: true,
    noInfo: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    stats: {
      colors: true
    }
  }

});

config.entry.unshift(
  'webpack-dev-server/client?http://localhost:8000/js/',
  'webpack/hot/only-dev-server'
);

config.module.loaders[2] = {
  include: /\.jsx?$/,
  loaders: ['react-hot', 'babel'],
  exclude: /node_modules/
};

module.exports = config;

