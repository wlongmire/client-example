
import React from 'react';

export const SectionOne = React.createClass({
  render () {
    return (
      <div className='section-one'>
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

          <button>Meet the people doing it</button>

          {
            (() => {
              if (this.state.media === 'desktop') {
                return (
                  <div className='how-arrow'>
                    <div>learn how</div>
                    <i className='fa fa-chevron-down'></i>
                  </div>
                );
              }
            })()
          }

        </div>

        <img src='images/Essential-Partner-1900x1350.jpg' />
      </div>
    );
  },

  getInitialState () {
    return {
      content: this.props.content,
      media: this.props.media
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.state.media !== this.props.media) {
      this.setState({
        media: this.props.media
      });
    }
  }

});
