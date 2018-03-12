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
import ImoocForm from '../../Components/ImoocForm/ImoocForm'

@connect(
  state => state.user,
  {register}
)
@ImoocForm
class Register extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   user: '',
    //   pwd: '',
    //   rpwd: '',
    //   type: 'genius' // 牛人
    // }
  }

  handleRegister() {
    this.props.register(this.props.state)    
    // this.props.history.push('/register')
  }

  // props.handleChange(key, value) {
  //   this.setState({
  //     [key]: value
  //   })
  // }

  render() {
    const RadioItem = Radio.RadioItem

    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <h2 style={{ textAlign: 'center' }}>注册页</h2>
        <List>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
          <InputItem onChange={v => this.props.handleChange('user', v)}>
            用户名
          </InputItem>
          <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>
            密码
          </InputItem>
          <InputItem type="password" onChange={v => this.props.handleChange('rpwd', v)}>
            确认密码
          </InputItem>
          <RadioItem
            checked={this.props.state.type === 'genius'}
            onChange={() => this.props.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={this.props.state.type === 'boss'}
            onChange={() => this.props.handleChange('type', 'boss')}
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

  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }
}

export default Register
