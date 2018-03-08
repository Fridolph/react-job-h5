import React, {Component} from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './logoutButton'
import Greeing from './Greeting'

export default class LoginControl extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false
    }
  }

  handleLoginClick() {
    this.setState({
      isLoggedIn: true
    })
  }

  handleLogoutClick() {
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn
    let button = null

    if (isLoggedIn) {
      button = <LogoutButton onClick={() => this.handleLogoutClick()} />
    } else {
      button = <LoginButton onClick={() => this.handleLoginClick()} />
    }

    return (
      <div>
        <Greeing isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}