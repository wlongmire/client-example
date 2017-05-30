import React, { Component } from 'react'
import flattenObj from 'components/shared/FormBuilder/utils/flattenObject'
import moment from 'moment'
import classNames from "classnames"
import _ from 'lodash'

import getControlGroups from 'components/shared/FormBuilder/utils/getControlGroups'
import { formatDollars, commifyNumber } from 'app/utils/utilities'

class ConfirmationModal extends Component {
  handleInputMask(params) {
    const {
      value,
      item
    } = params

    let transformedValue = value
    switch (item.inputType) {
      case ('dropdown-single'):
      case ('radio'):
        const options = item.attributes.options
        const valueOption = options.find(i => (String(i.value) === value))
        transformedValue = valueOption && valueOption.text
    }
    switch (item.inputFormat) {
      case ('number'):
        transformedValue = commifyNumber(value)
        break
      case ('currency'):
        transformedValue = formatDollars(value)
        break
      case ('date'):
        transformedValue = moment(value).format('MMMM Do YYYY')
        break
    }

    return (transformedValue)
  }

  render() {
    const {
      submission,
      form
    } = this.props

    const flattenedFormItems = form.questions
    const flattenedSubmission = flattenObj(submission)

    const insertSupplementalItems = (item) => {
      let rtn = []
      item.attributes.options.map((option) => {
        if (option.supplementalquestionIds && option.supplementalquestionIds.length > 0) {
          option.supplementalquestionIds.map((supIdx) => {
            const subItem = _.find(form.supplementalQuestions, s => (supIdx === s.questionId))
            rtn.push({ ...subItem, supplemental: true })
            const subSupItems = (subItem && subItem.attributes && subItem.attributes.options) ?
              insertSupplementalItems(subItem) : []
            rtn = _.concat(rtn, subSupItems)
          })
        }
      })

      return (rtn)
    }

    let flattenedAllItems = []
    flattenedFormItems.map((item) => {
      flattenedAllItems.push(item)

      const subItems = (item.attributes && item.attributes.options) ? insertSupplementalItems(item) : []
      flattenedAllItems = _.concat(flattenedAllItems, subItems)
    })

    const controlGroups = getControlGroups(flattenedAllItems)

    let results = []

    Object.keys(controlGroups).map((key) => {
      const items = controlGroups[key]
      
      if (items.length > 1) {
        const labelItem = flattenedFormItems.find((i) => {
          return (
            i.attributes &&
            i.attributes.controlGroup &&
            i.attributes.controlGroup === key &&
            i.inputFormat === 'label')
        })

        if (labelItem) {
          results.push({
            text: labelItem.text,
            type: 'label'
          })
        }
      }

      items.map((item) => {
        const value = flattenedSubmission[item.name]
        const transformedValue = this.handleInputMask({ value, item })

        if (value) {
          results.push({
            text: item.text,
            value: transformedValue,
            type: item.inputType,
            placeholder: (item.placeholder === undefined) ? '' : item.placeholder,
            format: item.inputFormat,
            supplemental: (item.supplemental !== undefined) ? item.supplemental : false
          })
        }
      })
    })

    const reviewQuestions = () => (
      results.map((r, idx) => {
        const answer = (r.supplemental && r.placeholder) ? (`${r.placeholder}: ${r.value}`) : r.value
        return (
          <div className="questionSet" key={ idx }>
            {
              (r.text) ? <span className={classNames('question', { supplemental: r.supplemental })}>{r.text}</span> : <span></span>
            }
            <span className={classNames('answer', {supplemental: r.supplemental })}>
              { answer }
            </span>
          </div>
        )
      })
    )

    return (<div className="questionBlocks">
      { reviewQuestions() }
    </div>)
  }
}

export default ConfirmationModal
