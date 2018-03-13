import React, { Component } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { sendMsg } from '../../Reducers/chat.redux'
// 组件
import { List, InputItem, NavBar } from 'antd-mobile'

const socket = io('ws://localhost:9093')

@connect(state => state, { sendMsg })
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }

  handleSubmit() {
    // console.log('点击发送', this.state)
    // socket.emit('sendmsg', { text })
    // this.setState({ text: '' })
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '' })
  }

  render() {
    // console.log('this.props', this.props)
    const { user } = this.props.match.params
    const Item = List.Item

    return (
      <div className="chat-page">
        <NavBar mode="dark">
          {user}
        </NavBar>
        {this.props.chat.chatmsg.map((v, i) => {
          return v.from === user ? (
            <List key={v._id}>
              <Item>{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item className="chat-me" extra={'avatar'}>{v.content}</Item>
            </List>
          )
        })}
        <div className="sticky-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => this.setState({ text: v })}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            />
          </List>
        </div>
      </div>
    )
  }

  componentDidMount() {
    // socket.on('recvmsg', data => {
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
    // this.props.getMsgList()
    // this.props.recvMsg()
  }
}

export default Chat
