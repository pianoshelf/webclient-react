
var browserify = require('browserify');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var paths = {
  scriptMain: 'app/main.jsx',
  scripts: 'app/*'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(callback) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], callback);
});

gulp.task('build', ['clean'], function() {
  var b = browserify();
  b.transform(reactify);
  b.add(paths.scriptMain);

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('build'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['build']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'build']);






