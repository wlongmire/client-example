 /** Component Class **/

class Component {
  constructor (props) {
    if (props) {
      this.props = props;
    }
  }

  async use (app, options, props) {
    let router = app;

    if (!app) {
      return console.log({
        error: true,
        msg: 'Express app required. example: mycomponent.use(app);'
      });
    }

    this.app = app;

    this.options = options || {};

    if (props) {
      this.props = props;
    }

    // -----------------------------------

    if (this.options.name) {
      this.componentName = this.options.name;

    } else {
      if (this.options.routePrefix) {
        this.componentName = this.options.routePrefix;

      } else {
        this.componentName = 'Unnamed';
      }
    }

    // -----------------------------------

    if (this.componentWillMount) {
      this.componentWillMount();
    }

    // -----------------------------------

    if (this.options.routePrefix) {
      if (this.routes) {
        let prefixedRoute = '/' + this.options.routePrefix;

        let router = require('express').Router();
        let routerDecorated = this.routes(router);

        if (!routerDecorated) {
          return console.log('███ ' + this.componentName + ' Component Error: the routes function must return the router when using prefixedRoute option');
        }

        app.use(
          prefixedRoute,
          routerDecorated
        );
      }

    } else {
      this.routes(app);
    }

    // -----------------------------------

    if (this.componentDidMount) {
      this.componentDidMount(app);
    }

    console.log('███ ' + this.componentName + ' component mounted');
  }
}

export default Component;
