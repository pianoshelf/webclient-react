'use strict'; // eslint-disable-line strict

// Import external modules
let babel = require('gulp-babel');
let browserSync = require('browser-sync');
let cache = require('gulp-cached');
let gulp = require('gulp');
let gutil = require('gulp-util');
let imagemin = require('gulp-imagemin');
let nodemon = require('nodemon');
let plumber = require('gulp-plumber');
let prefix = require('gulp-autoprefixer');
let reload = browserSync.reload;
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');

// Import internal modules
let config = require('./config');

// Boolean for whether we're running webpack-dev-server
let isRunningDevServer = false;

/**
 * Compile our images
 */
gulp.task('build:images', function() {
  return gulp.src(config.files.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(`${config.files.staticAssets}${config.files.images.out}`))
    .pipe(reload({ stream: true }));
});

/**
 * Compile our CSS files
 */
gulp.task('build:css', function() {
  return gulp.src(config.files.css.entry)
    .pipe(plumber())
    .pipe(sass({
      style: 'compact',
      includePaths: ['./assets/css', './node_modules'],
    }))
    .on('error', gutil.log)
    .pipe(prefix('ie >= 9'))
    .pipe(gulp.dest(`${config.files.staticAssets}${config.files.css.out}`))
    .pipe(reload({ stream: true }));
});

/**
 * Compile our JS files for development and launch webpack-dev-server.
 */
gulp.task('build:client', function(callback) {
  let webpackDevConfig = require('./webpack.dev.client');
  let webpackDevCompiler = webpack(webpackDevConfig);

  // Run webpack
  webpackDevCompiler.run(function(err) {
    if (err) throw new gutil.PluginError('build:client', err);

    // Set boolean to true if we're not running the server.
    if (!isRunningDevServer) {
      isRunningDevServer = true;

      // Start the dev server
      let devServer = new WebpackDevServer(webpackDevCompiler, webpackDevConfig.devServer);
      devServer.listen(config.ports.webpack, function(serverErr) {
        if (serverErr) throw new gutil.PluginError('webpack-dev-server', serverErr);
      });
    }

    // Call callback when done
    callback();
  });
});

/**
 * Compile our server files.
 */
gulp.task('build:server', function() {
  return gulp.src(config.files.server.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
      plugins: ['jsx-control-statements/babel'],
      blacklist: ['regenerator'],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.files.server.out));
});

/**
 * Compile our JS files for production.
 */
gulp.task('build:client:prod', function(callback) {
  let webpackProdConfig = require('./webpack.client');
  let webpackProdCompiler = webpack(webpackProdConfig);

  // Run webpack
  webpackProdCompiler.run(callback);
});


/**
 * Watch the necessary directories and launch BrowserSync.
 */
gulp.task('watch', ['build:client', 'build:server', 'build:css', 'build:images'], function() {
  gulp.watch(config.files.client.src, ['build:client']);
  gulp.watch(config.files.server.src, ['build:server']);
  gulp.watch(config.files.css.src, ['build:css']);
  gulp.watch(config.files.images.src, ['build:images']);

  // Launch Nodemon
  nodemon({
    env: { NODE_ENV: 'development' },
    watch: [ config.files.server.out ],
  });

  // Boolean to check if BrowserSync has started.
  let isBrowserSyncStarted = false;

  // Perform action right when nodemon starts
  nodemon.on('start', function() {

    // Only perform action when boolean is false
    if (!isBrowserSyncStarted) {
      isBrowserSyncStarted = true;

      // Set a timeout of 500 ms so that the server has time to start
      setTimeout(function() {

        // Launch BrowserSync
        browserSync({
          proxy: `localhost:${config.ports.express}`,
          open: false,
        });

      }, 500);
    }
  });
});

