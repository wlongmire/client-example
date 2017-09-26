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
      className, ratings, productTitle, mainTitle
    } = this.props
    console.log('THIS PROPS RATINGS xxxx', this.props.ratings)

    const regularTypeList = [
        { title: 'Total Premium', value: ratings.totalPremium },
        { title: 'Base Premium', value: ratings.premium },
        { title: 'Additional Coverage', value: ratings.additionalCoverage },
        { title: 'Terrorism Coverage', value: ratings.terrorPremium },
    ]

    const excessTypeList = [
          { title: 'Total Premium', value: ratings.totalExcessPremium },
          { title: 'Base Premium', value: ratings.excessPremium },
          { title: 'Terrorism Coverage', value: ratings.excessTerrorPremium }
    ]

    const quoteValues = (list) => {
      return list.map((item, idx) => {
        return (<ToggleDisplay
          key={idx}
          show={item.value && item.value > 0}
          render={() => (
            <div className="premiumNumber">
              {item.title}
              <span>${commifyNumber(item.value || 0)}</span>
            </div>)
          }
        />)
      })
    }

    return (
      <div>
        <div className={classNames('quoteBlock', className)}>
          {mainTitle !== null && <h4 className="quoteTitle">{mainTitle}</h4>}
          <h4>{productTitle}</h4>
          { quoteValues(regularTypeList) }
          {ratings.excessPremium > 0 &&
          <div className="">
            <h4>Excess</h4>
            { quoteValues(excessTypeList)}
          </div>}
        </div>
      </div>
    )
  }
}

QuoteBlock.propTypes = {
  className: PropTypes.string,
  ratings: PropTypes.object
}

export default QuoteBlock
