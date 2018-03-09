import React from 'react'

const FancyBorder = props => (
  <div className={'FancyBorder FancyBorder-' + props.color}>
    {props.children}
  </div>
)

export default FancyBorder