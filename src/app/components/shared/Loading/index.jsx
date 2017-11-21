import React from 'react'
import config from 'config'
import { trimAssetLink } from './../../utils/utilities'

const Loading = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img alt="Loading..." src={`${trimAssetLink(config.assetsURL)}/images/ajax-loader.gif`} />
    </div>
  )
}

export default Loading