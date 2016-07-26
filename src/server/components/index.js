 /** Component Class **/

class Component {
  constructor (props) {
    if (props) {
      this.props = props || {};
    }
  }

  async use (app, props) {
    let router = app;

    if (!app) {
      return console.log({
        error: true,
        msg: 'Express app required. Example: mycomponent.use(app);'
      });
    }

    this.app = app;

    this.props = props || {};

    // -----------------------------------

    if (this.props.name) {
      this.componentName = this.props.name;

    } else {
      if (this.props.routePrefix) {
        this.componentName = this.props.routePrefix;

      } else {
        this.componentName = 'Unnamed';
      }
    }

    // -----------------------------------

    if (this.componentWillMount) {
      this.componentWillMount();
    }

    // -----------------------------------

    if (this.props.routePrefix) {
      if (this.routes) {
        let prefixedRoute = '/' + this.props.routePrefix;

        let router = require('express').Router();
        let routerDecorated = this.routes(router);

        if (!routerDecorated) {
          return console.log('███ ' + this.componentName + ' Express Component Error: the routes function must return the router when using prefixedRoute option');
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

    console.log('███ ' + this.componentName + ' Express component mounted');
  }
}

export default Component;
