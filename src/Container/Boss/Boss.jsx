import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../Reducers/chatuser.redux'
// 组件
import UserCard from '../../Components/UserCard/UserCard'

@connect(state => state.chatuser, { getUserList })
class Boss extends Component {
  render() {
    return (
      <div className="page-content-wrapper">
        <UserCard userlist={this.props.userlist} />
      </div>      
    )
  }

  componentDidMount() {
    this.props.getUserList('genius')
  }
}

export default Boss
