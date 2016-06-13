
import React from 'react';

export const SectionThreeSlideOne = React.createClass({
  render () {
    return (
      <div className='section-three slide-one'>
        <div className='copy'>
          <h1>
            { this.state.content.heading }
          </h1>

          <p>
            { this.state.content.paragraphOne }
          </p>

          <p>
            { this.state.content.paragraphTwo }
          </p>
        </div>
      </div>
    );
  },

  getInitialState () {
    return {
      content: this.props.content
    };
  }

});

export const SectionThreeSlideTwo = React.createClass({
  render () {
    return (
      <div className='section-three slide-two'>
        <div className='copy'>
          <h1>
            { this.state.content.heading }
          </h1>

          <p>
            { this.state.content.paragraphOne }
          </p>

          <p>
            { this.state.content.paragraphTwo }
          </p>
        </div>
      </div>
    );
  },

  getInitialState () {
    return {
      content: this.props.content
    };
  }

});

export const SectionThreeSlideThree = React.createClass({
  render () {
    return (
      <div className='section-three slide-three'>
        <div className='copy'>
          <h1>
            { this.state.content.heading }
          </h1>

          <p>
            { this.state.content.paragraphOne }
          </p>

          <p>
            { this.state.content.paragraphTwo }
          </p>
        </div>
      </div>
    );
  },

  getInitialState () {
    return {
      content: this.props.content
    };
  }

});
