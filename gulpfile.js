'use strict'; // eslint-disable-line strict

// Import external modules
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const cache = require('gulp-cached');
const del = require('del');
const eslint = require('gulp-eslint');
const fs = require('fs');
const gulp = require('gulp');
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const minifyCss = require('gulp-minify-css');
const nodemon = require('nodemon');
const path = require('path');
const plumber = require('gulp-plumber');
const prefix = require('gulp-autoprefixer');
const pretty = require('prettysize');
const reload = browserSync.reload;
const rev = require('gulp-rev');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

// Import internal modules
const config = require('./config');

// Create an instance of the client compiler for caching
const webpackDevConfig = require('./webpack.dev.client');
const webpackDevCompiler = webpack(webpackDevConfig);

// Boolean for whether we're running webpack-dev-server
let isRunningDevServer = false;

/**
 * Compile our images
 */
gulp.task('build:images', () => {
  return gulp.src(config.files.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(`${config.files.staticAssets}${config.files.images.out}`))
    .pipe(reload({ stream: true }));
});

/**
 * Compile our CSS files
 */
gulp.task('build:css', () => {
  return gulp.src(config.files.css.entry)
    .pipe(plumber())
    .pipe(sass(config.build.sass))
    .pipe(prefix(config.build.autoprefixer))
    .pipe(size({ title: 'CSS' }))
    .pipe(gulp.dest(`${config.files.staticAssets}${config.files.css.out}`))
    .pipe(reload({ stream: true }));
});

/**
 * Compile our CSS files for production. This minifies our CSS as well.
 */
gulp.task('build:css:prod', () => {
  return gulp.src(config.files.css.entry)
    .pipe(sass(config.build.sass))
    .pipe(prefix(config.build.autoprefixer))
    .pipe(minifyCss())
    .pipe(size({ title: 'CSS' }))
    .pipe(gulp.dest(`${config.files.staticAssets}${config.files.css.out}`));
});

/**
 * Lint all our JS files.
 */
gulp.task('build:lint', () => {
  return gulp.src(config.files.client.src)
    .pipe(cache('build:lint'))
    .pipe(eslint())
    .pipe(eslint.format());
});

/**
 * Lint all our JS files, and fail on error. Useful on CI machines and build scripts.
 */
gulp.task('build:lint:prod', () => {
  return gulp.src(config.files.client.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

/**
 * Compile our server files.
 */
gulp.task('build:server', () => {
  return gulp.src(config.files.server.src)
    .pipe(cache('src:server'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel(config.build.babel.server))
    .pipe(sourcemaps.write('.'))
    .pipe(size({ title: 'Server JS' }))
    .pipe(gulp.dest(config.files.server.out));
});

/**
 * Compile our JS files for development and launch webpack-dev-server.
 */
gulp.task('build:client', callback => {
  // Run webpack
  webpackDevCompiler.run(err => {
    if (err) throw new gutil.PluginError('build:client', err);

    // Emulate gulp-size and ignore errors
    try {
      const outputConfig = webpackDevConfig.output;
      const jsFilePath = path.join(outputConfig.path, outputConfig.filename);
      gutil.log(`${gutil.colors.cyan('Client JS')} ${gutil.colors.green('all files ')}` +
                `${gutil.colors.magenta(pretty(fs.statSync(jsFilePath).size))}`);
    } catch (e) {}

    // Set boolean to true if we're not running the server.
    if (!isRunningDevServer) {
      isRunningDevServer = true;

      // Start the dev server. We have to make sure we send a new instance of the webpack compiler.
      const devServer = new WebpackDevServer(webpack(webpackDevConfig), webpackDevConfig.devServer);
      devServer.listen(config.ports.webpack, 'localhost', serverErr => {
        if (serverErr) throw new gutil.PluginError('webpack-dev-server', serverErr);
      });
    }

    // Call callback when done
    callback();
  });
});

/**
 * Compile our JS files for production.
 */
gulp.task('build:client:prod', callback => {
  const webpackProdConfig = require('./webpack.client');
  const webpackProdCompiler = webpack(webpackProdConfig);

  // Run webpack
  webpackProdCompiler.run(err => {
    if (err) throw new gutil.PluginError('build:client:prod', err);

    // Emulate gulp-size
    const outputConfig = webpackProdConfig.output;
    const jsFilePath = path.join(outputConfig.path, outputConfig.filename);
    gutil.log(`'${gutil.colors.cyan('Client Prod JS')}' ${gutil.colors.green('all files ')}` +
              `${gutil.colors.magenta(pretty(fs.statSync(jsFilePath).size))}`);

    callback();
  });
});

/**
 * Duplicate our CSS and JS files with hashes append to their names, so we can enable long term
 * caching.
 */
gulp.task('build:cache', () => {
  gulp.src(`${config.files.staticAssets}${config.files.css.out}/*.css`)
    .pipe(rev())
    .pipe(gulp.dest(`${config.files.staticAssets}${config.files.css.out}`))
    .pipe(rev.manifest())
    .pipe(gulp.dest(`${config.files.staticAssets}${config.files.css.out}`));

  gulp.src(`${config.files.staticAssets}${config.files.client.out}/*.js`)
    .pipe(rev())
    .pipe(gulp.dest(`${config.files.staticAssets}${config.files.client.out}`))
    .pipe(rev.manifest())
    .pipe(gulp.dest(`${config.files.staticAssets}${config.files.client.out}`));
});

/**
 * Clean out build folder so we are sure we're not building from some cache.
 */
gulp.task('clean', callback => {
  del(['build']).then(() => {
    callback();
  });
});

/**
 * Task to compile our files for production.
 */
gulp.task('compile', callback => {
  runSequence('clean', 'build:lint:prod', [
    'build:images',
    'build:css:prod',
    'build:client:prod',
    'build:server',
  ], 'build:cache', callback);
});

/**
 * Task to compile our files for production, ignoring linting.
 */
gulp.task('compile:nolint', callback => {
  runSequence('clean', [
    'build:images',
    'build:css:prod',
    'build:client:prod',
    'build:server',
  ], 'build:cache', callback);
});

/**
 * Watch the necessary directories and launch BrowserSync.
 */
gulp.task('watch', ['clean'], callback => {
  runSequence(
    'build:lint', [
      'build:images',
      'build:css',
      'build:client',
      'build:server',
    ], () => {
      // Watch files
      gulp.watch(config.files.client.src, ['build:client']);
      gulp.watch(config.files.server.src, ['build:server']);
      gulp.watch(config.files.client.src, ['build:lint']);
      gulp.watch(config.files.css.src, ['build:css']);
      gulp.watch(config.files.images.src, ['build:images']);

      // Launch Nodemon
      nodemon({
        env: { NODE_ENV: 'development' },
        watch: [config.files.server.out],
        ignore: [config.files.staticAssets],
      });

      // Boolean to check if BrowserSync has started.
      let isBrowserSyncStarted = false;

      // Perform action right when nodemon starts
      nodemon.on('start', () => {
        // Only perform action when boolean is false
        if (!isBrowserSyncStarted) {
          isBrowserSyncStarted = true;

          // Set a timeout of 500 ms so that the server has time to start
          setTimeout(() => {
            // Launch BrowserSync
            browserSync({
              proxy: `localhost:${config.ports.express}`,
              open: false,
            });

            // Call callback function to end gulp task
            callback();
          }, 500);
        }
      });
    }
  );
});

