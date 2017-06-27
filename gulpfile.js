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
  gulp.src('src/apigClient/*')
  .pipe(replace('@ApiStageEnv', 'dev'))
  .pipe(gulp.dest('dist/public/apigClient'))
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsOIEmail', 'owners@colonyspecialty.com'))
  .pipe(replace('@sgsOCPEmail', 'ocpsubmissions@colonyspecialty.com'))
  .pipe(replace('@argoEmail', 'jbuelow@colonyspecialty.com'))
  .pipe(replace('@serverUrl', 'https://ezn98yxd1k.execute-api.us-east-1.amazonaws.com/dev/'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'http://ownersedge-ratings-prod.us-east-1.elasticbeanstalk.com/'))
  .pipe(replace('@identityPoolId', 'us-east-1:57db5f54-9c0c-4d2f-8b92-d3279a07f61c')) // PROD
  .pipe(replace('@identityProvider', 'cognito-idp.us-east-1.amazonaws.com/us-east-1_XWOnd6XH0'))
  .pipe(replace('@userPoolId', 'us-east-1_XWOnd6XH0'))
  .pipe(replace('@clientId', '3n7362ap9pa11lrqv4uas31g36'))
  .pipe(replace('@region', 'us-east-1'))
  .pipe(gulp.dest('src/config/'))
})

gulp.task('transform:dev', () => {
  gulp.src('src/apigClient/*')
  .pipe(replace('@ApiStageEnv', 'dev'))
  .pipe(gulp.dest('dist/public/apigClient'))
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsOIEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@sgsOCPEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@argoEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@serverUrl', 'https://ezn98yxd1k.execute-api.us-east-1.amazonaws.com/dev/'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'http://ownersedge-ratings-prod.us-east-1.elasticbeanstalk.com/'))
  .pipe(replace('@identityPoolId', 'us-east-1:10911a6b-91ed-46c0-8f60-32d4b8e3ab97')) // DEV
  .pipe(replace('@identityProvider', 'cognito-idp.us-east-1.amazonaws.com/us-east-1_XWOnd6XH0'))
  .pipe(replace('@userPoolId', 'us-east-1_XWOnd6XH0'))
  .pipe(replace('@clientId', '3n7362ap9pa11lrqv4uas31g36'))
  .pipe(replace('@region', 'us-east-1'))
  .pipe(gulp.dest('src/config/'))
})

gulp.task('transform:qa', () => {
  gulp.src('src/apigClient/*')
  .pipe(replace('@ApiStageEnv', 'qa'))
  .pipe(gulp.dest('dist/public/apigClient'))
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsOIEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@sgsOCPEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@argoEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@serverUrl', 'https://ezn98yxd1k.execute-api.us-east-1.amazonaws.com/qa/'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'http://ownersedge-ratings-prod.us-east-1.elasticbeanstalk.com/'))
  .pipe(replace('@identityPoolId', 'us-east-1:6a0b54c3-6f76-4c64-a188-ebee6c0a02c4')) // QA
  .pipe(replace('@identityProvider', 'cognito-idp.us-east-1.amazonaws.com/us-east-1_XWOnd6XH0'))
  .pipe(replace('@userPoolId', 'us-east-1_XWOnd6XH0'))
  .pipe(replace('@clientId', '3n7362ap9pa11lrqv4uas31g36'))
  .pipe(replace('@region', 'us-east-1'))
  .pipe(gulp.dest('src/config/'))
})

gulp.task('transform:beta', () => {
  gulp.src('src/apigClient/*')
  .pipe(replace('@ApiStageEnv', 'dev'))
  .pipe(gulp.dest('dist/public/apigClient'))
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsOIEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@sgsOCPEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@argoEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@serverUrl', 'https://ezn98yxd1k.execute-api.us-east-1.amazonaws.com/dev/'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'http://ownersedge-ratings-prod.us-east-1.elasticbeanstalk.com/'))
  .pipe(replace('@identityPoolId', 'us-east-1:10911a6b-91ed-46c0-8f60-32d4b8e3ab97')) // DEV
  .pipe(replace('@identityProvider', 'cognito-idp.us-east-1.amazonaws.com/us-east-1_XWOnd6XH0'))
  .pipe(replace('@userPoolId', 'us-east-1_XWOnd6XH0'))
  .pipe(replace('@clientId', '3n7362ap9pa11lrqv4uas31g36'))
  .pipe(replace('@region', 'us-east-1'))
  .pipe(gulp.dest('src/config/'))
})

gulp.task('transform:local', () => {
  gulp.src('src/apigClient/*')
  .pipe(replace('@ApiStageEnv', 'dev'))
  .pipe(gulp.dest('dist/public/apigClient'))
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsOIEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@sgsOCPEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@argoEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@serverUrl', 'http://localhost'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  // .pipe(replace('@ratingsUrl', 'http://ownersedge-ratings-prod.us-east-1.elasticbeanstalk.com/')) // qa
  .pipe(replace('@identityPoolId', 'us-east-1:10911a6b-91ed-46c0-8f60-32d4b8e3ab97')) // DEV
  .pipe(replace('@identityProvider', 'cognito-idp.us-east-1.amazonaws.com/us-east-1_XWOnd6XH0'))
  .pipe(replace('@userPoolId', 'us-east-1_XWOnd6XH0'))
  .pipe(replace('@clientId', '3n7362ap9pa11lrqv4uas31g36'))
  .pipe(replace('@region', 'us-east-1'))
  .pipe(gulp.dest('src/config/'))
})

gulp.task('transform:local-qa', () => {
  gulp.src('src/apigClient/*')
  .pipe(replace('@ApiStageEnv', 'qa'))
  .pipe(gulp.dest('dist/public/apigClient'))
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsOIEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@sgsOCPEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@argoEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@serverUrl', 'http://localhost'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@ratingsUrl', 'http://ownersedge-ratings-prod.us-east-1.elasticbeanstalk.com/'))
  .pipe(replace('@identityPoolId', 'us-east-1:6a0b54c3-6f76-4c64-a188-ebee6c0a02c4')) // QA
  .pipe(replace('@identityProvider', 'cognito-idp.us-east-1.amazonaws.com/us-east-1_XWOnd6XH0'))
  .pipe(replace('@userPoolId', 'us-east-1_XWOnd6XH0'))
  .pipe(replace('@clientId', '3n7362ap9pa11lrqv4uas31g36'))
  .pipe(replace('@region', 'us-east-1'))
  .pipe(gulp.dest('src/config/'))
})

gulp.task('transform:local-prod', () => {
  gulp.src('src/apigClient/*')
  .pipe(replace('@ApiStageEnv', 'prod'))
  .pipe(gulp.dest('dist/public/apigClient'))
  gulp.src('configTemplate/*')
  .pipe(replace('@sgsOIEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@sgsOCPEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@argoEmail', 'argoaccessquickquote@gmail.com'))
  .pipe(replace('@serverUrl', 'http://localhost'))
  .pipe(replace('@appId', '57ab6abcf36d2840aa667f6e'))
  .pipe(replace('@mongoURI', 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev'))
  .pipe(replace('@identityPoolId', 'us-east-1:57db5f54-9c0c-4d2f-8b92-d3279a07f61c')) // PROD
  // .pipe(replace('@identityPoolId', 'us-east-1:6a0b54c3-6f76-4c64-a188-ebee6c0a02c4')) // QA
  // .pipe(replace('@identityPoolId', 'us-east-1:10911a6b-91ed-46c0-8f60-32d4b8e3ab97')) // DEV
  .pipe(replace('@identityProvider', 'cognito-idp.us-east-1.amazonaws.com/us-east-1_XWOnd6XH0'))
  .pipe(replace('@userPoolId', 'us-east-1_XWOnd6XH0'))
  .pipe(replace('@clientId', '3n7362ap9pa11lrqv4uas31g36'))
  .pipe(replace('@region', 'us-east-1'))
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

// gulp.task('apiClient', () => {
//   return gulp.src('src/apigClient/**/*')
//     .pipe(gulp.dest('dist/public/apigClient'))
// })

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
gulp.task('serve:development', ['transform:local', 'html', 'images', 'fonts'],
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