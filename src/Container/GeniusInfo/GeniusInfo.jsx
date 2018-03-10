import React, { Component } from 'react'
// redux
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {update} from '../../Reducers/user.redux'
// 组件
import {
  NavBar,
  InputItem,
  TextareaItem,
  WingBlank,
  WhiteSpace,
  Button,
  List
} from 'antd-mobile'
import AvatarSelector from '../../Components/AvatarSelector/AvatarSelector'

@connect(
  state => state.user,
  {update}
)
class GeniusInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      title: '',      
      desc: ''
    }
  }

  selectAvatar(imageName) {
    this.setState({
      avatar: imageName
    })
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {
    const path = this.props.location.pathname
    const redirectTo = this.props.redirectTo
    return (
      <div>
        {redirectTo && redirectTo !== path ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        <AvatarSelector selectAvatar={n => this.selectAvatar(n)} />
        <List renderHeader={'请填写信息'}>
          <InputItem onChange={v => this.onChange('title', v)}>
            应聘职位
          </InputItem>          
          <TextareaItem
            onChange={v => this.onChange('desc', v)}
            rows={1}
            autoHeight
            title="个人简介"
          />
        </List>
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
        </WingBlank>
      </div>
    )
  }
}

export default GeniusInfo
