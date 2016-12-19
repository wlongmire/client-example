import React from 'react';

export default (props) => {
  
  const { submission, submit } = props;

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
        <div className="item">
            <span className="left">Defined area of project Scope:</span>
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
            <span className="text">{submission.limitsRequested}</span>
        </div>
       <div className="buttonWrapper">
        <button className="button" onClick={()=>window.history.back()}>Go back</button>
        <button className="button pull-right getQuote" onClick={()=> submit(submission)}>Get Quote</button>
        </div>
    </div>
  );
};






