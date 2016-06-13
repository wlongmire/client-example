
// Dependencies

import React from 'react';
import { render } from 'react-dom';
import querystring from 'querystring';
import $ from 'jquery';
import fullpage from 'fullpage.js';
import config from '../../config.js';
import content from './data.js';

// Components

import { LandingAppTopbar } from './Topbar';
import { LandingAppSiteMap } from './SiteMap';
import { LandingAppContactBlock } from './ContactBlock';
import { LandingAppFooter } from './Footer';
import { LandingAppFooterBarFixed } from './FooterBarFixed';
import { SectionOne } from './SectionOne';
import { SectionTwo } from './SectionTwo';
import {
  SectionThreeSlideOne,
  SectionThreeSlideTwo,
  SectionThreeSlideThree
} from './SectionThree';

// App Component

export const LandingApp = React.createClass({
  render () {
    return (
      <div className='landing-app'>
        <LandingAppTopbar media={ this.state.media } />

        <LandingAppFooterBarFixed />

        <div id='fullpage'>
          <div className='section'>
            <SectionOne
              content={ content.sectionOne }
              media={ this.state.media }>
            </SectionOne>
          </div>

          <div className='section'
               style={{ background: '#32a4d8' }}>
            <SectionTwo
              content={ content.sectionTwo }>
            </SectionTwo>
          </div>

          <div className='section'
               style={{ background: '#A7DBD8' }}>

            <div className='slide'>
              <SectionThreeSlideOne
                content={ content.sectionThree.slideOne } />
            </div>

            <div className='slide'>
              <SectionThreeSlideTwo
                content={ content.sectionThree.slideTwo } />
            </div>

            <div className='slide'>
              <SectionThreeSlideThree
                content={ content.sectionThree.slideThree } />
            </div>
          </div>

          <div className='section fp-auto-height'>
            <LandingAppContactBlock />
            <LandingAppFooter />
          </div>
        </div>
      </div>
    );
  },

  getInitialState () {
    return {
      media: 'mobile'
    };
  },

  componentDidMount () {
    $(document).ready(() => {
      var fp = $('#fullpage').fullpage({
        // Navigation
        anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour'],
        navigation: false,
        navigationTooltips: ['Intro', 'About', 'Story', 'Contact', 'Footer'],
        showActiveTooltip: true,

        // Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: true,
        loopTop: true,
        loopHorizontal: false,
        // continuousVertical: true,
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        // Accessibility
        animateAnchor: true,
        keyboardScrolling: true,
        recordHistory: true,

        // Events
        // afterLoad: function(anchorLink, index){
        //   console.log('afterLoad', anchorLink, index);
        // },

        // afterRender: function(){
        //   console.log('afterRender');
        // },

        // afterResize: function(){
        //   console.log('afterResize');
        // },

        // afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
        //   console.log('afterSlideLoad', anchorLink, index);
        // },

        // onLeave: function(index, nextIndex, direction){
        //   console.log('leave', index, nextIndex);
        // },

        // onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
        //   console.log('onSlideLeave', anchorLink, index);
        // }
      });
    });
  },

  media (query) {
    return window.matchMedia(query).matches;
  },

  handleMediaQuery () {
    let mediaQuery = '(min-width: ' + config.desktopWidth +'px)';
    let matches = this.media(mediaQuery);

    this.setState({
      media: (matches) ? 'desktop' : 'mobile'
    });
  }

});
