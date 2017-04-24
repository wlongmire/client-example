import React from 'react'
import { connect } from 'react-redux'
import flattenObj from 'components/shared/FormBuilder/utils/flattenObject'
import moment from 'moment'

import getControlGroups from 'components/shared/FormBuilder/utils/getControlGroups'
import { formatDollars, commifyNumber } from 'app/utils/utilities';

const ConfirmationModal = React.createClass({

  handleInputMask(params){
    const {
      value,
      item
    } = params;

    let transformedValue = value

    switch(item.inputType) {
      case("radio"):
      case("dropdown-single"):
        const options = item.attributes.options
        const valueOption = options.find((i)=>(String(i.value) === value))
        transformedValue = valueOption && valueOption.text
    }
    
    switch(item.inputFormat) {
      case("number"):
        transformedValue = commifyNumber(value)
        break;
      case("currency"):
        transformedValue = formatDollars(value)
        break;
      case("date"):
        transformedValue = moment(value).format('MMMM Do YYYY')
        break;
    }

    return(transformedValue)
  },

  render() {
    const { 
      submission,
      form
    } = this.props;

    const flattenedFormItems = form.questions.concat(form.supplementalQuestions);
    const flattenedSubmission = flattenObj(submission)
    const controlGroups = getControlGroups(flattenedFormItems)

    // console.log(flattenedFormItems)
    // console.log(flattendSubmission)

    let results = []

    Object.keys(controlGroups).map((key)=>{
      const items =  controlGroups[key]
      
      if (items.length > 1) {
        const labelItem = flattenedFormItems.find((i)=>{
          return(
            i.attributes && 
            i.attributes.controlGroup && 
            i.attributes.controlGroup === key && 
            i.inputFormat === "label")
        })

        if (labelItem) {
          results.push({
            text: labelItem.text,
            type: "label"
          })
        }        
      }

      items.map((item)=>{
        const value = flattenedSubmission[item.name]
        const transformedValue = this.handleInputMask({value, item})
        
        if (value) {
          
          results.push({
            text:item.text,
            value: transformedValue,
            type:item.inputType,
            format:item.inputFormat
          })

        }
        
      })
    })

    const reviewQuestions = ()=>(
      
      results.map((r, idx)=>{

        return(
          <div className="questionSet" key={idx}>
            {
              (r.text)?<span className="question">{r.text}</span>:<span></span>
            }
            
            <span className="answer">{r.value}</span>
          </div>
        )
      })
      
    );

    return (
    <div className="questionBlocks">
      {reviewQuestions()}
    </div>);
  }
  
});

export default ConfirmationModal;
