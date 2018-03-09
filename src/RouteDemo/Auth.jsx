import React from 'react'
import {connect} from 'react-redux'
import {login} from './Autho.redux'

// 两个reducers 每个reducers都有一个state 
// 合并reducers
@connect(
  state => state
)
class Auth extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <h2>Auth</h2>
    )
  }
}

export default Auth