import React, { Component } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { sendMsg, getMsgList, recvMsg, readMsg } from '../../Reducers/chat.redux'
import { getChatId } from '../../util/str'
// 组件
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'

const socket = io('ws://localhost:9093')

@connect(state => state, { sendMsg, getMsgList, recvMsg, readMsg })
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
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
    this.setState({
      text: ''
    })
  }

  handleClickEmoji() {
    this.setState({ showEmoji: !this.state.showEmoji })
    // 用来解决grid滑动的bug
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 1)
  }

  render() {
    // console.log('this.props', this.props)
    const userid = this.props.match.params.user
    const Item = List.Item
    const { users } = this.props.chat
    if (!users[userid]) return null
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    // -------
    const bq = [
      { icon: '/img/QQ-Emoji-PNG/a_001_cy.png' },
      { icon: '/img/QQ-Emoji-PNG/a_002_tp.png' },
      { icon: '/img/QQ-Emoji-PNG/a_003_lh.png' },
      { icon: '/img/QQ-Emoji-PNG/a_004_tx.png' },
      { icon: '/img/QQ-Emoji-PNG/a_005_zj.png' },
      { icon: '/img/QQ-Emoji-PNG/a_006_qiao.png' },
      { icon: '/img/QQ-Emoji-PNG/a_007_ch.png' },
      { icon: '/img/QQ-Emoji-PNG/a_008_zt.png' },
      { icon: '/img/QQ-Emoji-PNG/a_009_mg.png' },
      { icon: '/img/QQ-Emoji-PNG/a_010_ll.png' },
      { icon: '/img/QQ-Emoji-PNG/a_011_dk.png' },
      { icon: '/img/QQ-Emoji-PNG/a_012_xu.png' },
      { icon: '/img/QQ-Emoji-PNG/a_013_kuk.png' },
      { icon: '/img/QQ-Emoji-PNG/a_014_zk.png' },
      { icon: '/img/QQ-Emoji-PNG/a_015_wq.png' },
      { icon: '/img/QQ-Emoji-PNG/a_016_bb.png' },
      { icon: '/img/QQ-Emoji-PNG/a_017_zhd.png' },
      { icon: '/img/QQ-Emoji-PNG/a_018_cd.png' },
      { icon: '/img/QQ-Emoji-PNG/a_019_ka.png' },
      { icon: '/img/QQ-Emoji-PNG/a_020_se.png' },
      { icon: '/img/QQ-Emoji-PNG/a_021_hx.png' },
      { icon: '/img/QQ-Emoji-PNG/a_022_dy.png' },
      { icon: '/img/QQ-Emoji-PNG/a_023_tuu.png' },
      { icon: '/img/QQ-Emoji-PNG/a_024_wx.png' },
      { icon: '/img/QQ-Emoji-PNG/a_025_fn.png' },
      { icon: '/img/QQ-Emoji-PNG/a_026_gg.png' },
      { icon: '/img/QQ-Emoji-PNG/a_027_jk.png' },
      { icon: '/img/QQ-Emoji-PNG/a_028_lengh.png' },
      { icon: '/img/QQ-Emoji-PNG/a_029_xin.png' },
      { icon: '/img/QQ-Emoji-PNG/a_030_sa.png' }
    ].map(v => ({ icon: v.icon }))
    const emoji = '🌝 👌 🤔 🏪 ☀ ⚡ ⏩ ⏰ ♈ ♉ ♊ ♋ ♌ ⛪'
      .split(' ').filter(v => v).map(item => ({text: item}))


    return (
      <div id="chat-page" className="page-content-wrapper">
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          mode="dark"
        >
          {users[userid].name}
        </NavBar>
        <div className="chat-content-wrapper">
        {chatmsgs.map((v, i) => {
          const avatar = require(`../../Components/AvatarSelector/img/${
            users[v.from].avatar
          }.png`)

          return v.from === userid ? (
            <List key={v._id + '-' + i}>
              <Item thumb={avatar}>{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item className="chat-me" extra={<img src={avatar} />}>
                {v.content}
              </Item>
            </List>
          )
        })}
        </div>
        <div className="sticky-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => this.setState({ text: v })}
              extra={
                <div>
                  <span
                    style={{ marginRight: 15 }}
                    onClick={() => this.handleClickEmoji()}
                  >
                    <img src="/img/QQ-Emoji-PNG/a_019_ka.png" alt="emoji" />
                  </span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            />
          </List>
          {this.state.showEmoji ? (
            <Grid
              data={emoji}
              columnNum={7}
              carouselMaxRow={3}
              isCarousel={true}
              onClick={el => (
                // console.log('el', el)
                this.setState({
                  text: this.state.text + el.text
                })
              )}
            />
          ) : null}
        </div>
      </div>
    )
  }

  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }   
    // console.log('this.props =>', this.props)    
  }

  componentWillUnmount() {
    // console.log('chat - unmount')
    // 标记消息已读
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
}

export default Chat
