import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }

  handleClickToPage(v) {
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    return (
      <WingBlank>
        {this.props.userlist.map(
          (v, i) =>
            v.avatar ? (
              <div key={i + '-' + Math.random()}>
                <WhiteSpace />
                <Card 
                  onClick={() => this.handleClickToPage(v)}
                  key={v._id}>
                  <Card.Header
                    title={v.user}
                    thumb={`/img/avatar/${v.avatar}.png`}
                    extra={<span>{v.title}</span>}
                  />
                  <Card.Body>
                    {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                    {v.desc.split('\n').map(n => <div key={n}>{n}</div>)}
                    {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
                  </Card.Body>
                </Card>
              </div>
            ) : null
        )}
      </WingBlank>
    )
  }
}

export default UserCard