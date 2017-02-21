import React from 'react';
import map from 'lodash/map';

export default (props) => {

  const { submission, submit } = props;


  const limits = [{12:'1m/2m'},{22:'2m/2m'},{24:'2m/4m'},{33:'3m/3m'},{44:'4m/4m'},{55:'5m/5m'} ];

  console.log(limits);
  console.log(submission.limitsRequested);

  return (
    <div className="confirmation__container">
        <h2 className="title">Review Details</h2>
        <hr />

       { submission.primaryNamedInsured && <div className="item"><span className="left">Named Insured:</span><span className="text"> { submission.primaryNamedInsured }</span></div> }
        <div className="item">
            <span className="left">Total cost of this project:</span>
            <span className="text">{submission.costs}</span>
        </div>

        <div className="item">
            <span className="left">Term of the project, in months:</span>
            <span className="text">{submission.term}</span>
        </div>

        <div className="item">
            <span className="left">Anticipated Finish Date of Project:</span>
            <span className="text">{submission.anticipatedFinishDate}</span>
        </div>

        <div className="item">
            <span className="left">Name of the Designated Contractor:</span>
            <span className="text">{submission.generalContractor.name}</span>
        </div>

        <div className="item">
            <span className="left">GL Carrier of Contractor:</span>
            <span className="text">{submission.generalContractor.glCarrier}</span>
        </div>

        <div className="item">
            <span className="left">Expiration Date of the Contractor's GL Policy:</span>
            <span className="text">{submission.generalContractor.glExpirationDate}</span>
        </div>

        <div className="item">
            <span className="left">Excess limits of the Contractor's primary Policy:</span>
            <span className="text">{submission.generalContractor.glLimits}</span>
        </div>

        <div className="item">
            <span className="left">Project Address:</span>
            <span className="text">{ submission.address.street } { submission.address.city }, { submission.address.state } { submission.address.zip }
            </span>
        </div>

        {
          (()=> {
            if (submission.address.state === 'NY') {

              return(<div className="item">
                <span className="left">
                  Is this a NYCHA Project?
                </span>
                <span className="text">{submission.nycha}</span>
              </div>);

            }
          })()
        }
       <div className="item">
            <span className="left">
            Does the project include the addition of any stories or vertical expansion?
            </span>
            <span className="text">{submission.overFourFloors}</span>
        </div>

        <div className="item">
            <span className="left">Is project limited to specific floors:</span>
            <span className="text">{submission.projectDefinedAreaScope}</span>
        </div>

        <div className="item">
            <span className="left">Scope of work for this project:</span>
            <span className="text">{submission.scope}</span>
        </div>

        <div className="item">
            <span className="left">Will the named insured be involved with any supervision or oversight of the project?:</span>
            <span className="text">{submission.isSupervisingSubs}</span>
        </div>
        <div className="item">
            <span className="left">Does the project require any of the following(Blasting, Airport Runways, Bridge Construction, Parking Garages/Decks, Dams, Underground Tunneling for Subways or Mines)</span>
            <span className="text">{submission.projectRequirements}</span>
        </div>

        <div className="item">
            <span className="left">What limits are being requested for this OCP?</span>
            <span className="text">
              {
                (()=>{
                  if (submission.limitsRequested)
                    return map(limits, submission.limitsRequested)
                })()
              }
            </span>
        </div>

        <div className="item">
            <span className="left">Contact info to receive your indication</span>
            <span className="text">{submission.contactInfo.email}</span>
        </div>

       <div className="buttonWrapper">
         <button className="button" onClick={()=>window.history.back()}>Go back</button>
         <button className="button pull-right getQuote" onClick={()=> submit(submission)}>Get Quote</button>
      </div>
    </div>
  );
};
