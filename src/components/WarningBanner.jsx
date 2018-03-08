import React from 'react';

const WarningBanner = (props) => {
  if (!props.warn) return null

  return (
    <div className="warning">Warning!</div>
  )
}

export default WarningBanner;
