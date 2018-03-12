import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../Reducers/user.redux'
// 组件
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'

@connect(
  state => state.user,
  {logoutSubmit}
)
class Me extends Component {

  logout() {    
    // console.log('退出登录')
    const alert = Modal.alert
    alert('注销', '确认退出登录吗???', [
      {text: '取消', onPress: () => console.log('取消')},
      {text: '确认', onPress: () => {
        browserCookies.erase('userid')
        this.props.logoutSubmit()
      }},
    ])
  }

  render() {
    const props = this.props
    const {Item} = List
    const {Brief} = Item
    console.log('this.props = ', props)
    return props.user ? (
      <div> 
        <Result
          img={<img src={`/img/avatar/${props.avatar}.png`}  width="50" height="50" alt={props.avatar} />}
          title={props.user}
          message={            
            props.type === 'boss' ? props.company : null
          }
        />
        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            {props.title}
            {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
            {props.money ? <Brief>薪资 {props.money}</Brief> : ''}
          </Item>
        </List>
        <WhiteSpace />
        <Button onClick={() => this.logout()}>退出登录</Button>
      </div>
    ) : <Redirect to={props.redirectTo} />
  }
}

export default Me
