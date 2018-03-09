import React from 'react'

const SplitPane = props => (
  <div className="SplitPane">
    <div className="SplitPane-left">
      {props.left}
    </div>
    <div className="SplitPane-right">
      {props.right}
    </div>
  </div>
)

export default SplitPane