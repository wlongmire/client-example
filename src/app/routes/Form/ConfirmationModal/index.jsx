import React from 'react';
import { connect } from 'react-redux';
import flattenObj from 'components/shared/FormBuilder/utils/flattenObject';

const ConfirmationModal = React.createClass({

  render() {
    const { 
      submission,
      controlGroups,
      form
    } = this.props;

    const flattenedSubmission = flattenObj(submission)
    const flattenedFormItems = form.questions.concat(form.supplementalQuestions);
    const results = Object.keys(flattenedSubmission).map((item)=>{
      const formItem = flattenedFormItems.find((f)=>(f.name === item));

      return {
        name:   item,
        text:   item.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2"),
        value:  flattenedSubmission[item],
        controlGroup:  (formItem.attributes && formItem.attributes.controlGroup) || item
      }
    });

    const reviewQuestions = ()=>(
      results.map((r, idx)=>{
        return(
          <div className="questionSet" key={idx} >
            <span className="question">{r.text}</span>
            <span className="answer">answer</span>
          </div>
        )
      })
    );

    return (
    <div>
      {reviewQuestions()}
    </div>);
  }
  
});

export default ConfirmationModal;
