import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import Logo from '../../Components/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../Reducers/user.redux'

@connect(
  state => state.user,
  {register}
)
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      rpwd: '',
      type: 'genius' // 牛人
    }
  }

  handleRegister() {
    this.props.register(this.state)    
    // this.props.history.push('/register')
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    const RadioItem = Radio.RadioItem

    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <h2 style={{ textAlign: 'center' }}>注册页</h2>
        <List>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
          <InputItem onChange={v => this.handleChange('user', v)}>
            用户名
          </InputItem>
          <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>
            密码
          </InputItem>
          <InputItem type="password" onChange={v => this.handleChange('rpwd', v)}>
            确认密码
          </InputItem>
          <RadioItem
            checked={this.state.type === 'genius'}
            onChange={() => this.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={this.state.type === 'boss'}
            onChange={() => this.handleChange('type', 'boss')}
          >
            Boss
          </RadioItem>
        </List>
        <WhiteSpace />
        <WingBlank>
          <WhiteSpace />
          <Button type="primary" onClick={() => this.handleRegister()}>
            点击注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register
