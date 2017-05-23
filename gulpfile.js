/*
 * dependencies
 */

const del = require('del')
const eslint = require('gulp-eslint')
const gulp = require('gulp')
const runSequence = require('run-sequence')
const shell = require('gulp-shell')
const webpack = require('webpack')
const webpackConfigDev = require('./webpack.config.dev')
const webpackConfigProd = require('./webpack.config.prod')
const WebpackDevServer = require('webpack-dev-server')
const replace = require('gulp-replace')
const config = require('./src/config')

gulp.task('transform:prod', () => {
  gulp.src('configTemplate/*')
  // .pipe(replace('@sgsOIEmail', 'owners@colonyspecialty.com'))
  // .pipe(replace('@sgsOCPEmail', 'ocpsubmissions@colonyspecialty.com'))
  .pipe(replace('@sgsOIEmail', 'warren@eager.to'))
  .pipe(replace('@sgsOCPEmail', 'warren@eager.to'))
  .pipe(replace('@argoEmail', 'warren@eager.to'))
  .pipe(replace('@serverUrl', 'www.ownersedge.us'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'http://ownersedge-ratings-prod.us-east-1.elasticbeanstalk.com/'))
  .pipe(replace('@identityPoolId', 'us-east-1:ba19f09e-c0fe-4835-bce6-cf17ff45f4ef'))
  .pipe(replace('@userPoolId', 'us-east-1_xHMTRwuln'))
  .pipe(replace('@region', 'us-east-1'))
  .pipe(replace('@clientId', '3n1q5qr2eldkqdnm98btc9dd9e'))
  .pipe(gulp.dest('src/config/'));
});

gulp.task('transform:dev', () => {
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsOIEmail', 'warren@eager.to'))
  .pipe(replace('@sgsOCPEmail', 'warren@eager.to'))
  .pipe(replace('@argoEmail', 'warrenlongmire@gmail.com'))
  .pipe(replace('@serverUrl', 'www.ownersedge.us'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'http://ownersedge-ratings-prod.us-east-1.elasticbeanstalk.com/'))
  .pipe(replace('@identityPoolId', 'us-east-1:35542332-4207-4161-81ca-22dca501dbff'))
  .pipe(replace('@userPoolId', 'us-east-1_DdxblSokM'))
  .pipe(replace('@region', 'us-east-1'))
  .pipe(replace('@clientId', '6kd2kc58pr8oafjvaijejnh0ct'))
  .pipe(gulp.dest('src/config/'))
})

gulp.task('transform:beta', () => {
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsOIEmail', 'allisonesteranko@gmail.com'))
  .pipe(replace('@sgsOCPEmail', 'justin.steranko@gmail.com'))
  .pipe(replace('@argoEmail', 'jbuelow@colonyspecialty.com'))
  .pipe(replace('@serverUrl', 'www.ownersedge.us'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'http://ownersedge-ratings-prod.us-east-1.elasticbeanstalk.com/'))
  .pipe(replace('@identityPoolId', 'us-east-1:35542332-4207-4161-81ca-22dca501dbff'))
  .pipe(replace('@userPoolId', 'us-east-1_DdxblSokM'))
  .pipe(replace('@region', 'us-east-1'))
  .pipe(replace('@clientId', '6kd2kc58pr8oafjvaijejnh0ct'))
  .pipe(gulp.dest('src/config/'))
})

gulp.task('transform:local', () => {
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsOIEmail', 'warren@eager.to'))
  .pipe(replace('@sgsOCPEmail', 'warren@eager.to'))
  .pipe(replace('@argoEmail', 'warrenlongmire@gmail.com'))
  .pipe(replace('@serverUrl', 'http://localhost'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'http://ownersedge-ratings-prod.us-east-1.elasticbeanstalk.com/'))
  .pipe(replace('@identityPoolId', 'us-east-1:35542332-4207-4161-81ca-22dca501dbff'))
  .pipe(replace('@userPoolId', 'us-east-1_DdxblSokM'))
  .pipe(replace('@region', 'us-east-1'))
  .pipe(replace('@clientId', '6kd2kc58pr8oafjvaijejnh0ct'))
  .pipe(gulp.dest('src/config/'))
})

/*
 * tasks
 */

gulp.task('build:node', shell.task([
  'npm run build'
]))

gulp.task('build', (cb) => {
  runSequence('clean',
    ['html', 'images', 'webpack:build', 'fonts', 'build:node'],
    cb)
})

gulp.task('clean', () => {
  return del('dist/**/*')
})

gulp.task('default', ['build'])

gulp.task('lint', () => {
  return gulp.src('src/app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
})

gulp.task('html', () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/public'))
})

gulp.task('images', () => {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/public/images'))
})

gulp.task('fonts', () => {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/public/fonts'))
})

gulp.task('webpack:build', (callback) => {
  return webpack(webpackConfigProd, (err, stats) => {
    if (err) throw err
    console.log('[webpack:build]', stats.toString({
      colors: true
    }))
    callback()
  })
})

gulp.task('dev', ['serve:dev'])
gulp.task('d', ['serve:dev'])
gulp.task('s', ['serve:dev'])
gulp.task('serve', ['serve:dev'])
gulp.task('serve:dev', ['serve:development'])

gulp.task('serve:development', ['transform:local', 'html', 'images', 'fonts', 'build:node'],
() => {
  new WebpackDevServer(webpack(webpackConfigDev), {
    publicPath: webpackConfigDev.output.publicPath,
    hot: true,
    historyApiFallback: true,
    contentBase: './dist/public',
    stats: {
      colors: true,
      chunks: false
    }
  }).listen(7777, 'localhost', (err) => {
    if (err) {
      return console.log(err)
    }

    // By default we don't run the Node server here
    // to save resources. It is used in production
    // for example on Heroku, to serve the static dir.
    // To use it, uncomment the next line

    gulp.run('serve:node:development')

    setTimeout(() => {
      console.log(`███ ███ WebPack Dev Server at http://localhost: ${config.webpackserver.port}`);
    }, 5000)
  })
})

gulp.task('serve:node:development', shell.task([
  'NODE_ENV="development" nodemon --watch src/server --watch src/config --debug src/server/index.js --exec babel-node'
]))

gulp.task('serve:production', ['serve:node:production'])

gulp.task('serve:node:production', shell.task([
  'NODE_ENV="production" node src/server/index.js'
]))