/*
 * dependencies
 */

var del = require('del');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var htmlreplace = require('gulp-html-replace');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');
var symlink = require('gulp-sym');
var uglify = require('gulp-uglify');
var webpack = require('webpack');
var webpackConfigDev = require('./webpack.config');
var webpackConfigProd = require('./webpack.config.prod');
var webpackDevServer = require('webpack-dev-server');
var webpackStream = require('webpack-stream');

/*
 * tasks
 */

gulp.task('build', function (cb) {
  runSequence('clean',
    ['html', 'images', 'js', 'fonts'],
    cb);
});

gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('default', ['build']);

gulp.task('lint', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
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
    .pipe(webpackStream(webpackConfigProd))
    .on('error', errorGraceful)
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('serve:prod', ['build'], function () {
  var started = false;

  nodemon({
    script: 'server/index.js'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('serve:dev', ['build'], function () {
  new webpackDevServer(webpack(webpackConfigDev), {
    publicPath: webpackConfigDev.output.publicPath,
    hot: true,
    historyApiFallback: true,
    contentBase: './src'
  }).listen(7777, 'localhost', function (err, result) {
    if (err) {
      return console.log(err);
    }

    console.log('Listening at http://localhost:7777/');
  });
});

function errorGraceful (error) {
  console.log(error.toString());
  this.emit('end');
}
