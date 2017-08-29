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
const es = require('event-stream')


//moving constants for identity variables
const sgsOIEmail = process.env.sgsOIEmail || 'colonyspecialtyquickquote@gmail.com'
const sgsOCPEmail = process.env.sgsOCPEmail || 'colonyspecialtyquickquote@gmail.com'
const argoEmail = process.env.argoEmail || 'ownersedgesubmissionsdev@gmail.com'
const ownersEdgeEmail = process.env.ownersEdgeEmail || 'argoaccessquickquote@gmail.com'
const apiGatewayUrl = process.env.apiGatewayUrl || 'https://c27z16ujzj.execute-api.us-east-1.amazonaws.com/dev'
const assetsUrl = process.env.assetsUrl || 'https://s3.us-east-2.amazonaws.com/ownersedge-dev-assets'
const identityPoolId = process.env.identityPoolId || 'us-east-1:0f2ab670-06b8-4f06-88bd-2b3708c8435b'
const awsRegion = process.env.awsRegion || 'us-east-1'
const userPoolId = process.env.userPoolId || 'us-east-1_3SgBuYU4O'
const clientId = process.env.clientId || '76c9vth2qtg841ivles7aurmvv'
const clearanceFailEmail = process.env.clearanceFailEmail || 'argoaccessquickquote@gmail.com'
const clearanceFailFlag = process.env.clearanceFailFlag === 'true' || false
const stage = config.env

gulp.task('transform', ['apiTransform'], () => {
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsOIEmail', sgsOIEmail))
  .pipe(replace('@sgsOCPEmail', sgsOCPEmail))
  .pipe(replace('@argoEmail', argoEmail))
  .pipe(replace('@ownerEdgeEmail', ownersEdgeEmail))
  .pipe(replace('@serverUrl', apiGatewayUrl))
  .pipe(replace('@assetsURL', assetsUrl))
  .pipe(replace('@identityPoolId', identityPoolId)) // PROD
  .pipe(replace('@identityProvider', `cognito-idp.${awsRegion}.amazonaws.com/${userPoolId}`))
  .pipe(replace('@userPoolId', userPoolId))
  .pipe(replace('@clientId', clientId))
  .pipe(replace('@region', awsRegion))
  .pipe(replace('@clearanceFailEmail', clearanceFailEmail))
  .pipe(replace('@clearanceFailFlag', clearanceFailFlag))
  .pipe(replace('@stageEnv', stage))
  .pipe(gulp.dest('src/config/'))
})

gulp.task('transform:local', ['apiTransform:local'], () => {
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsOIEmail', 'colonyspecialtyquickquote@gmail.com'))
  .pipe(replace('@sgsOCPEmail', 'colonyspecialtyquickquote@gmail.com'))
  .pipe(replace('@argoEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@ownerEdgeEmail', 'ownersedgesubmissionsdev@gmail.com'))
  .pipe(replace('@serverUrl', 'http://localhost'))
  .pipe(replace('@assetsURL', 'https://s3.us-east-1.amazonaws.com/ownersedge-dev-assets/'))
  .pipe(replace('@appId', '76c9vth2qtg841ivles7aurmvv'))
  .pipe(replace('@identityPoolId', 'us-east-1:0f2ab670-06b8-4f06-88bd-2b3708c8435b')) // DEV
  .pipe(replace('@identityProvider', 'cognito-idp.us-east-1.amazonaws.com/us-east-1_3SgBuYU4O'))
  .pipe(replace('@userPoolId', 'us-east-1_3SgBuYU4O'))
  .pipe(replace('@clientId', '76c9vth2qtg841ivles7aurmvv'))
  .pipe(replace('@region', 'us-east-1'))
  .pipe(replace('@clearanceFailEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@clearanceFailFlag', true))
  .pipe(replace('@stageEnv', 'dev'))
  .pipe(gulp.dest('src/config/'))
})

  // OLD PROD CREDENTIALS
  // .pipe(replace('@clientId', '7mufec3sdmn9hfp70k41cq3fkc'))
  // .pipe(replace('@userPoolId', 'us-east-1_zbchOMkxh'))
  // .pipe(replace('@identityProvider', 'cognito-idp.us-east-1.amazonaws.com/us-east-1_zbchOMkxh'))
  // .pipe(replace('@identityPoolId', 'us-east-1:4eea8f56-daa6-4090-9d1f-1c0093d8a7b7')) // DEV
  // .pipe(replace('@appId', 'appIdorsomething'))
  // .pipe(replace('@assetsURL', 'https://s3.us-east-2.amazonaws.com/ownersedge-dev-assets'))

gulp.task('apiTransform:local', () => {
  gulp.src(['apigClientTemplate/*/**', 'apigClientTemplate/index.js'])
  .pipe(replace('@ApiGatewayUrl', 'https://c27z16ujzj.execute-api.us-east-1.amazonaws.com/dev'))
  .pipe(gulp.dest('src/apigClient/'))
})

gulp.task('apiTransform', () => {
  gulp.src(['apigClientTemplate/*/**', 'apigClientTemplate/index.js'])
  .pipe(replace('@ApiGatewayUrl', apiGatewayUrl))
  .pipe(gulp.dest('src/apigClient/'))
})

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
    .pipe(replace('@random', Date.now()))
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

// TEST BACKEND DEV LOCALLY
gulp.task('serve:development', ['html', 'images', 'fonts', 'build:node'],
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

    // gulp.run('serve:node:development')

    setTimeout(() => {
      console.log(`███ ███ WebPack Dev Server at http://localhost: ${config.webpackserver.port}`)
    }, 5000)
  })
})

// TEST BACKEND QA LOCALLY
gulp.task('serve:local-qa', ['transform:local-qa', 'html', 'images', 'fonts'],
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

    // gulp.run('serve:node:development')

    setTimeout(() => {
      console.log(`███ ███ WebPack Dev Server at http://localhost: ${config.webpackserver.port}`);
    }, 5000)
  })
})

// TEST BACKEND PROD LOCALLY
gulp.task('serve:local-prod', ['transform:local-prod', 'html', 'images', 'fonts'],
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

    // gulp.run('serve:node:development')

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