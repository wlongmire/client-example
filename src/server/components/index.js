 /** Component Class **/

class Component {
  async use (app, config) {
    if (!app) {
      return console.log({
        error: true,
        msg: 'app required. example: mycomponent.use(app);'
      });
    }

    this.app = app;

    if (config) {
      this.config = config;
    }

    if (this.componentWillMount) {
      this.componentWillMount(app);
    }

    if (this.routes) {
      this.routes(app);
    }

    if (this.componentDidMount) {
      this.componentDidMount(app);
    }
  }
}

export default Component;
