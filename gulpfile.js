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
var webpackConfigDev = require('./webpack.config.dev');
var webpackConfigProd = require('./webpack.config.prod');
var webpackDevServer = require('webpack-dev-server');
var webpackStream = require('webpack-stream');
var replace = require('gulp-replace');
var config = require('./src/config');

gulp.task('transform:prod', function(){
  gulp.src('configTemplate/*')
  .pipe(replace('@argoEmail', 'jbuelow@colonyspecialty.com'))
  .pipe(replace('@sgsEmail', 'owners@colonyspecialty.com'))
  .pipe(replace('@serverUrl', 'http://www.ownersedge.us'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://xxread:xxread@52.25.41.113:27017/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'https://oe-rating-engine.herokuapp.com'))
  .pipe(gulp.dest('src/config/'));
});

gulp.task('transform:dev', function(){
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsEmail', 'warren.longmire@argogroupus.com'))
  .pipe(replace('@argoEmail', 'intake@ownersedge.us'))
  .pipe(replace('@serverUrl', 'http://dev.ownersedge.us'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'https://oe-rating-engine-dev.herokuapp.com'))
  .pipe(gulp.dest('src/config/'));
});

gulp.task('transform:beta', function(){
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsEmail', 'warren.longmire@argogroupus.com'))
  .pipe(replace('@argoEmail', 'jbuelow@colonyspecialty.com'))
  .pipe(replace('@serverUrl', 'http://beta.ownersedge.us'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'https://oe-rating-engine-dev.herokuapp.com'))
  .pipe(gulp.dest('src/config/'));
});

gulp.task('transform:local', function(){
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsEmail', 'warren.longmire@argogroupus.com'))
  .pipe(replace('@argoEmail', 'warrenlongmire@gmail.com'))
  .pipe(replace('@serverUrl', 'http://localhost'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'https://oe-rating-engine-dev.herokuapp.com'))
  .pipe(gulp.dest('src/config/'));
});

/*
 * tasks
 */

gulp.task('build:node', shell.task([
  'npm run build'
]));

gulp.task('build', function (cb) {
  runSequence('clean',
    ['html', 'images', 'webpack:build', 'fonts', 'build:node'],
    cb);
});

gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('default', ['build']);

gulp.task('lint', function () {
  return gulp.src('src/app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('html', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/public'));
});

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/public/images'));
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/public/fonts'));
});

gulp.task('webpack:build', ['lint'], function (callback) {
  return webpack(webpackConfigProd, function (err, stats) {
    if (err) throw err;
    console.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('dev', ['serve:dev']);
gulp.task('d', ['serve:dev']);
gulp.task('s', ['serve:dev']);
gulp.task('serve', ['serve:dev']);
gulp.task('serve:dev', ['serve:development']);

gulp.task('serve:development', ['transform:local','html', 'images', 'fonts', 'build:node'],
function () {
  new webpackDevServer(webpack(webpackConfigDev), {
    publicPath: webpackConfigDev.output.publicPath,
    hot: true,
    historyApiFallback: true,
    contentBase: './dist/public',
    stats: {
      colors: true,
      chunks: false
    }
  }).listen(7777, 'localhost', function (err, result) {
    if (err) {
      return console.log(err);
    }

    // By default we don't run the Node server here
    // to save resources. It is used in production
    // for example on Heroku, to serve the static dir.
    // To use it, uncomment the next line

     gulp.run('serve:node:development');

    setTimeout(function () {
      console.log('███ ███ WebPack Dev Server at http://localhost:' + config.webpackserver.port);
    }, 5000);
  });
});

gulp.task('serve:node:development', shell.task([
  'NODE_ENV="development" nodemon --watch src/server --watch src/config --debug src/server/index.js --exec babel-node'
]));

gulp.task('serve:production', ['serve:node:production']);

gulp.task('serve:node:production', shell.task([
  'NODE_ENV="production" node src/server/index.js'
]));




function errorGraceful (error) {
  console.log(error.toString());

  this.emit('end');
}
