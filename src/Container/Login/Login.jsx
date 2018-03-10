import React, { Component } from 'react'
import Logo from '../../Components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import {Redirect} from 'react-router-dom'
// redux
import {connect} from 'react-redux'
import {login} from '../../Reducers/user.redux'

@connect(
  state => state.user,
  {login}
)
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
  }

  handleEnterLogin(e) {
    if (e.which !== 13) return
    this.handleLogin()
  }

  handleRegister() {
    this.props.history.push('/register')
  }

  handleLogin() {
    // console.log('this.props', this.props)
    // console.log('this.state', this.state)
    this.props.login(this.state)
  }

  handleInputChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <h2 style={{ textAlign: 'center' }}>登录页</h2>
        <WingBlank>
          <List>  
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}          
            <InputItem onChange={value => this.handleInputChange('user', value)}>
              用户
            </InputItem>
            <WhiteSpace />
            <InputItem type="password" onKeyPress={e => this.handleEnterLogin(e)} onChange={value => this.handleInputChange('pwd', value)}>
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={() => this.handleLogin()}>
            登录
          </Button>
          <p style={{ textAlign: 'center' }}>
            没有账户，<span onClick={() => this.handleRegister()}>
              点击注册
            </span>
          </p>
        </WingBlank>
      </div>
    )
  }
}

export default Login
