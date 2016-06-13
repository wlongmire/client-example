
import React from 'react';

export const SectionTwo = React.createClass({
  render () {
    return (
      <div className='section-two'>
        <div className='copy'>
          <h1>
            { this.state.content.heading }
          </h1>

          <p>
            { this.state.content.paragraphOne }
          </p>

          <button>Play now</button>
        </div>

        <img src='images/img-1900x1350.jpg' />
      </div>
    );
  },

  getInitialState () {
    return {
      content: this.props.content
    };
  }

});
