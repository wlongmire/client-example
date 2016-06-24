/*
 * dependencies
 */

var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var del = require('del');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var historyApiFallback = require('connect-history-api-fallback');
var htmlmin = require('gulp-htmlmin');
var htmlreplace = require('gulp-html-replace');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var symlink = require('gulp-sym');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config');

/*
 * functions
 */

function errorGraceful (error) {
  console.log(error.toString());
  this.emit('end');
}

/*
 * tasks
 */

gulp.task('build', function (cb) {
  runSequence('clean', ['html', 'images', 'js', 'sass', 'fonts'], cb);
});

gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('default', ['build']);

gulp.task('lint', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .on('error', errorGraceful);
});

gulp.task('html', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('js', ['lint'], function () {
  return gulp.src('src/js/index.jsx')
    .pipe(webpack(webpackConfig))
    .on('error', errorGraceful)
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['build'], function () {
  // Use this by default,
  // if you do not need to run your own node server.
  // It will perform a bit better than the alternative.
  browserSync.init({
    server: './dist',
    middleware: [historyApiFallback()],
    port: 8885,
    ui: {
      weinre: {
        port: 9995
      }
    },
    ghostMode: {
      // clicks: false,
      // forms: false,
      scroll: false
    },
    notify: false
  });

  // // Use this if you need to run our node server locally.
  // // See /server
  // // If you need that, disable the browserSync.init above.
  // var started = false;

  // nodemon({
  //   script: 'server/index.js'
  // }).on('start', function () {
  //   if (!started) {
  //     cb();
  //     started = true;
  //   }
  // });

  // browserSync.init(null, {
  //   proxy: 'http://localhost:8999',
  //   files: ['dist/*'],
  //   port: 8885
  // });

  gulp.watch([
    'src/index.html'
  ], ['build']);

  gulp.watch([
    'src/js/**/*.js',
    'src/js/**/*.jsx'
  ], ['js']);

  gulp.watch([
    'src/sass/**/*',
    'src/js/**/*.scss'
  ], ['sass']);
});
