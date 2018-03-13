import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import {getMsgList, recvMsg} from '../../Reducers/chat.redux'
// 组件
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../NavLinkBar/NavLinkBar'
import Boss from '../../Container/Boss/Boss'
import Genius from '../../Container/Genius/Genius'
import Msg from '../../Container/Msg/Msg'
import Me from '../../Container/Me/Me'

@connect(state => state, {getMsgList, recvMsg})
class Dashboard extends Component {  

  render() {
    const { pathname } = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: Me
      }
    ]

    return (
      <div>
        <NavBar className="fixed-header" mode="dard">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <Switch>
          {navList.map(v => (
            <Route key={v.path} path={v.path} component={v.component} />
          ))}
        </Switch>
        <div>
          <NavLinkBar data={navList} />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.getMsgList()
    this.props.recvMsg()
  }
}

export default Dashboard
