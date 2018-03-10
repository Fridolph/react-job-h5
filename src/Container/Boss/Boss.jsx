import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../Reducers/chatuser.redux'
// 组件
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

@connect(
  state => state.chatuser,
  {getUserList}
)
class Boss extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <WingBlank>
        {this.props.userlist.map(
          v =>
            v.avatar ? (
              <div>
                <WhiteSpace />
                <Card key={v._id}>
                  <Card.Header
                    title={v.user}
                    thumb={`./../img/${v.avatar}.png`}
                    extra={<span>{v.title}</span>}
                  />
                  <Card.Body>
                    {v.desc.split('\n').map(v => <div key={v}>{v}</div>)}
                  </Card.Body>
                </Card>
              </div>
            ) : null
        )}
      </WingBlank>
    )
  }

  componentDidMount() {
    this.props.getUserList('genius')
  }
}

export default Boss
