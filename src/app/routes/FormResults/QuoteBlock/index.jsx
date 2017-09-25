import React, { Component, PropTypes } from 'react'
import ToggleDisplay from 'app/components/shared/ToggleDisplay'
import { commifyNumber } from 'app/utils/utilities'
import classNames from 'classnames'

export class QuoteBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      title, className, totalPremium, basePremium, terrorismCoverage, additionalCoverage
    } = this.props
    console.log('THIS PROPS xxxx', this.props)

    const typeList = [
        { title: 'Total Premium', value: totalPremium },
        { title: 'Base Premium', value: basePremium },
        { title: 'Additional Coverage', value: additionalCoverage },
        { title: 'Terrorism Coverage', value: terrorismCoverage }
    ]

    const quoteValues = typeList.map((item, idx) => (
      <ToggleDisplay
        key={idx}
        show={item.value && item.value > 0}
        render={() => (
          <div className="premiumNumber">
            {item.title}
            <span>${commifyNumber(item.value || 0)}</span>
          </div>)
        }
      />
    ))

    return (
      <div className={classNames('quoteBlock', className)}>
        <h4>{title}</h4>
        { quoteValues }
      </div>)
  }
}

QuoteBlock.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  totalPremium: PropTypes.number,
  basePremium: PropTypes.number,
  terrorismCoverage: PropTypes.number,
  additionalCoverage: PropTypes.number
}

export default QuoteBlock
