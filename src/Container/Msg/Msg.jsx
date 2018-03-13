import React, { Component } from 'react'
import { connect } from 'react-redux'
// 组件
import { List, WhiteSpace, Badge } from 'antd-mobile'

@connect(state => state)
class Msg extends Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }

  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    // if (!this.props.chat.chatmsg.length) return
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // 按照聊天分组，根据chatid
    // console.log('msgGroup', msgGroup)
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).createTime
      const b_last = this.getLast(b).createTime
      return b_last - a_last
    })

    return (
      <div>
        {chatList.map(v => {
          // console.log('chatList item', v)
          const lastItem = this.getLast(v)
          const targetId = v[0].from === userid ? v[0].to : v[0].from
          // 判断是否为毒
          const unreadNum = v.filter(v => !v.read && v.to === userid).length

          if (!userinfo[targetId]) return null
          const name = userinfo[targetId] ? userinfo[targetId].name : ''
          const avatar = userinfo[targetId] ? userinfo[targetId].avatar : ''

          return (
            <div key={lastItem._id} className="msg-list-wrapper">
              <WhiteSpace />
              <List>
                <Item
                  extra={<Badge text={unreadNum}></Badge>}                  
                  thumb={require(`../../Components/AvatarSelector/img/${userinfo[targetId].avatar}.png`)}
                  arrow="horizontal"
                  onClick={() => this.props.history.push(`/chat/${targetId}`)}
                >
                  {lastItem.content}
                  <Brief>{name}</Brief>
                </Item>
              </List>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Msg
