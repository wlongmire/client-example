
import React from 'react';

export const LandingAppContactBlock = React.createClass({
  render () {
    return (
      <div className='contact-block'>
        <h2>Contact Info</h2>

        <div className='row contact-columns'>
          <div className='col-xs-12 col-sm-6 col-md-4'>
            <h3>Jersey City</h3>

            <address>
              101 Hudson Street<br />
              12th Floor<br />
              Jersey City, NJ 07302
            </address>
          </div>

          <div className='col-xs-12 col-sm-6 col-md-4'>
            <h3>Global</h3>

            <address>
              110 Pitts Bay Road<br />
              Pembroke HM 08<br />
              Bermuda
            </address>
          </div>
        </div>
      </div>
    );
  }
});
