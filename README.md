# SKONK WORKS U-1

For developing new properties.

## Deploying New Apps

#### Install Node.js and npm:

https://nodejs.org

#### Make a new repository for your new app:

http://github.com

#### Clone this seed kit repo:

```
$ git clone --bare https://github.com/Argo-DigitalVentures/SkonkWorksU1.git

$ cd SkonkWorksU1.git
```

#### Push the clone to your new app repo:

```
$ git push --mirror https://github.com/exampleuser/new-repository.git
```

#### Check your new repo and confirm it worked. If so, go ahead and delete the source clone:

```
$ cd ..

$ rm -rf gulp-webpack-dev-seed.git
```

#### Finally, clone your new repo and start using it:

```
$ git clone https://github.com/exampleuser/new-repository.git

$ cd new-repository
```

## Running Locally

#### Install the modules:

```
$ npm install
```

#### Start the Webpack Dev Server

```
$ gulp serve:dev
```

The server will watch for changes, injecting SASS  and JavaScript changes as you save.

You can access the site here:

http://localhost:7777

#### Run the Production Server:

```
$ gulp serve:prod
```

The site will build and you can access it here:

http://localhost:8888

You can manually build the site in another terminal window as this server is running.

#### Manually build site:

```
$ gulp build
```

The site will be built in `/dist`.

## Server

A node server is included at `/src/server/index.js` and by default is only used as a static directory server, used in production. For example by Heroku.

As such, when you run the `webpack` dev server using the `gulp` commands described above, this Node server will not launch.

To enable it, edit the `gulpfile`, uncommenting the relevant line:

```
gulp.task('serve:development', [
  'build',
  // 'serve:node:development'
],
```

Alternatively, you can launch the Node server manually with one the following `npm` commands:

```
$ npm run serve:development
$ npm run serve:debug
$ npm run start
````

### Server Components

The server can be extended to be used as a local API. Just extend the Express app as you normally would.

It's likely best practice to contain as much of your code within components for maintenance, scalability, and shareability.

Included are some optional, only mildly opinionated patterns for components. See the example `Platform` component.

To enable a component, in the server file, at a minimum add this:

```
import example from './components/Example';

example.use(app);

```

You can add your Express routes anywhere you like, but the Component class does have some options for that if you prefer a separation of concerns.

With the above code, you can add routes like this inside your component:

```
class Example extends Component {
  routes (router) {
    router.get('/example/test',
      this.handleGetTest
    );
  }
}

// http://localhost:8888/example/test
```
Optionally can have routes automatically prefixed by passing some configuration in the server file. 

This approach is recommended for safety and efficiency.

```
import example from './components/Example';

example.use(app, {
  routePrefix: 'example'
});
```
```
class Example extends Component {
  routes (router) {
    router.get('/test',
      this.handleGetTest
    );

    return router;
  }
}

// http://localhost:8888/example/test
```
The server configuration can also include an optional Component name. At present this only affects the console output when the component is mounted.

```

example.use(app, {
  name: 'Example',
  routePrefix: 'example'
});

As well as routing, the component class offers a couple other simple functions which are inspired by React.

Each of these functions is automatically fired, in the order they are listed here:

```
class Example extends Component {
  componentWillMount () {
  }

  routes (router) {
  }

  componentDidMount () {
  }
}
```

