 /** Component Class **/

class Component {
  constructor (props) {
    if (props) {
      this.props = props;
    }
  }

  async use (app, props) {
    if (!app) {
      return console.log({
        error: true,
        msg: 'app required. example: mycomponent.use(app);'
      });
    }

    this.app = app;

    if (props) {
      this.props = props;
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
