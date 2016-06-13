
import React from 'react';

export const LandingAppSiteMap = React.createClass({
  render () {
    return (
      <div className='site-map'>
        <div className='row'>
          <div className='col-xs-12 col-sm-8'>
            <h3>Lorem Ipsum</h3>

            <ul>
              <li>
                <a>Deep Links</a>
              </li>
              <li>
                <a>Into Existing Site</a>
              </li>
              <li>
                <a>Lorem Ipsum</a>
              </li>
              <li>
                <a>Lorem Ipsum</a>
              </li>
              <li>
                <a>Lorem Ipsum</a>
              </li>
              <li>
                <a>Lorem Ipsum</a>
              </li>
            </ul>
          </div>

          <div className='col-xs-12 col-xs-4 annual-report-thumb'>
            Annual Report Site Thumbnail
          </div>
        </div>
      </div>
    );
  }
});
