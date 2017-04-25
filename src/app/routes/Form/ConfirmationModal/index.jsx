import React from 'react'
import { connect } from 'react-redux'
import flattenObj from 'components/shared/FormBuilder/utils/flattenObject'
import moment from 'moment'
import classNames from "classnames"
import _ from 'lodash'

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
    } = this.props

    // const flattenedFormItems = form.questions.concat(form.supplementalQuestions);
    // const flattenedSubmission = flattenObj(submission)
    // const controlGroups = getControlGroups(flattenedFormItems)

    const flattenedFormItems = form.questions
    const flattenedSubmission = flattenObj(submission)

    const insertSupplementalItems = (item)=>{
      let rtn = []

        item.attributes.options.map((option)=>{
          
          if(option.supplementalquestionIds && option.supplementalquestionIds.length > 0) { 
            option.supplementalquestionIds.map((supIdx)=>{
              const subItem = _.find(form.supplementalQuestions, (s)=>(supIdx === s.questionId))
              rtn.push( {...subItem, supplemental:true} )

              const subSupItems = (subItem.attributes && subItem.attributes.options)?insertSupplementalItems(subItem):[]
              rtn = _.concat(rtn, subSupItems)
            })
          }

        })

        return(rtn)
    }

    //for each form item
    let flattenedAllItems = []
    flattenedFormItems.map((item)=>{
      flattenedAllItems.push(item)

      const subItems = (item.attributes && item.attributes.options)?insertSupplementalItems(item):[]
      flattenedAllItems = _.concat(flattenedAllItems,subItems)
    })

    //  for each option if it exists
    //    get all supplementalids
    //    for all of each of these ids
    //      find the supplementalid that connects to it
    //      find the form item that connects to that item
    //      insert item into flattenedFormItems after the current form item
    //      do the same thing for this form item (if options exist)
    
    const controlGroups = getControlGroups(flattenedAllItems)
    
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
            placeholder:(item.placeholder === undefined)?"":item.placeholder,
            format:item.inputFormat,
            supplemental: (item.supplemental !== undefined)?item.supplemental:false
          })

        }
        
      })
    })

    const reviewQuestions = ()=>(
      
      results.map((r, idx)=>{
        let answer = (r.supplemental && r.placeholder)?(r.placeholder + ": " + r.value):r.value
        
        return(
          <div className="questionSet" key={idx}>
            {
              (r.text)?<span className={classNames("question", {"supplemental":r.supplemental})}>{r.text}</span>:<span></span>
            }
            
            <span className={classNames("answer", {"supplemental":r.supplemental})}>
              { answer }
            </span>
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
