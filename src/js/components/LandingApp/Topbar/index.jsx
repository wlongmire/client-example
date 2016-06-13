
import React from 'react';
import { MainNav } from './MainNav';

let SearchButton = React.createClass({
  render () {
    return (
      <button
        type='button'
        className='btn btn-lg menu-btn'
        onClick={ this.handleSearchButtonClick }>
        <i className='fa fa-search'></i>
      </button>
    );
  }
});

let LogoContainer = React.createClass({
  render () {
    return (
      <div
        className='logo'
        onClick={ this.handleLogoClick }>
      </div>
    );
  }
});

let MenuButton = React.createClass({
  render () {
    return (
      <button
        type='button'
        className='btn btn-lg search-btn'
        onClick={ this.props.handleClick }>
        <i className='fa fa-bars'></i>
      </button>
    );
  } 
});

export const LandingAppTopbar = React.createClass({
  render () {
    return (
      <div className='topbar'>
        {
          (() => {
            if (this.state.media === 'mobile') {
              return <div className='row'>
                <div className='column col-xs-4'>
                  <SearchButton />
                </div>

                <div className='column col-xs-4'>
                  <LogoContainer />
                </div>

                <div className='column col-xs-4'>
                  <MenuButton handleClick={ this.toggleMainNav } />
                </div>
              </div>;
            } else {
              return <div className='row'>
                <div className='column col-xs-8'>
                  <LogoContainer />
                </div>

                <div className='column col-xs-4'>
                  <SearchButton />
                  <MenuButton handleClick={ this.toggleMainNav } />
                </div>
              </div>;
            }
          })()
        }
        {
          (() => {
            if (this.state.showMainNav) {
              return <MainNav
                media={ this.state.media }
                toggleMainNav={ this.toggleMainNav } />;
            }
          })()
        }
      </div>
    );
  },

  getInitialState() {
    return {
      media: this.props.media,
      showMainNav: false
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.state.media !== this.props.media) {
      this.setState({
        media: this.props.media
      });
    }
  },

  handleSearchButtonClick () {
    console.log('show search tool');
  },

  handleLogoClick () {
    console.log('reset content state');
  },

  toggleMainNav () {
    this.setState({
      showMainNav: !this.state.showMainNav
    })
  }

});
