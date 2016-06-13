
'use strict';

// Dependencies

import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

// Components

import { LandingApp } from './components/LandingApp';

// JavaScript container for the project

window.Argo = {};

// JS app object

function AppFactory () {
  return {
    start: function start () {
      console.log('Start: Argo Group');
      return this;
    },

    store: null
  };
};

// Initialize the app

$(document).ready(() => {
  window.Argo = {
    app: AppFactory().start()
  };

  render(
    <div>
      <LandingApp />
    </div>,
    $('.app-container')[0]
  );
});
