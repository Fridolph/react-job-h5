import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../Reducers/chatuser.redux'
// 组件
import UserCard from '../../Components/UserCard/UserCard'

@connect(
  state => state.chatuser,
  {getUserList}
)
class Boss extends Component {  
  render() {
    return <UserCard userlist={this.props.userlist} />
  }

  componentDidMount() {
    this.props.getUserList('genius')
  }
}

export default Boss
