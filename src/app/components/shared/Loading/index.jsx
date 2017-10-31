import React from 'react'
import config from 'config'

const Loading = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img alt="Loading..." src={`${config.assetsURL}/images/ajax-loader.gif`} />
    </div>
  )
}

export default Loading