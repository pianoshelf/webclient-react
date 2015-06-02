'use strict';

let webpack = require('webpack');
let path = require('path');

module.exports = {

  target: 'web',
  cache: true,
  debug: false,
  devtool: 'none',
  entry: ['./app/main.jsx'],

  output: {
    path: path.resolve('./build/static/js'),
    filename: 'bundle.js',
    chunkFilename: '[name].[id].js',
    publicPath: 'js/'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        IS_CLIENT: 'true'
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],

  module: {
    loaders: [
      {
        include: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        include: /\.json$/,
        loaders: ['json']
      },
      {
        include: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },

  node: {
    fs: 'empty'
  },

  resolve: {
    extensions: ['', '.jsx', '.js']
  }

};


