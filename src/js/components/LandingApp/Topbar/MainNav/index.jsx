
import React from 'react';
import { LandingAppSiteMap } from '../../SiteMap';

// Search, Logo, Menu

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

let MobileCloseButton = React.createClass({
  render () {
    return (
      <button
        type='button'
        className='btn btn-lg close-btn'
        onClick={ this.props.handleClick }>
        <i className='fa fa-close'></i>
      </button>
    );
  }
});

export const MainNav = React.createClass({
  render () {
    return (
      <div className='main-nav'>
        {
          (() => {
            if (this.state.media === 'mobile') {
              return (
                <div className='row'>
                  <div className='column col-xs-4'>
                    <SearchButton />
                  </div>
                  <div className='column col-xs-4'>
                    <LogoContainer />
                  </div>
                  <div className='column col-xs-4'>
                    <MobileCloseButton handleClick={ this.props.toggleMainNav } />
                  </div>
                </div>
              )
            }
          })()
        }
        <ul className='main-list'>
          <li><a onClick={ this.handleNavClick }>Section One</a></li>
          <li>Section Two</li>
          <li>Section Three</li>
          <li><a onClick={ this.handleNavClick }>Insights</a></li>
          {

            // <a href="#sectionOne">Section One</a>
            // <a href="#sectionTwo">Section Two</a>
            // <a href="#sectionThree">Section Three</a>

            (() => {
              if (this.state.media === 'desktop') {
                return (
                  <li>Site Map</li>
                );
              }
            })()
          }
        </ul>
        {
          (() => {
            if (this.state.media === 'mobile') {
              return (
                <LandingAppSiteMap />
              );
            }
          })()
        }
      </div>
    );
  },

  getInitialState () {
    return {
      media: this.props.media
    };
  },

  componentWillReceiveProps(nextProps) {
    // Move all these `media` states to Redux
    if (this.state.media !== nextProps.media) {
      this.setState({
        media: nextProps.media
      });
    }
  },

  handleNavClick () {
    this.props.toggleMainNav();
  }
});
