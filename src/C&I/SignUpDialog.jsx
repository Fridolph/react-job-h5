import React, { Component } from 'react';
import Dialog from './Dialog'
import {Button} from 'antd-mobile'

class SignUpDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '你好吗'
    }
  }

  handleChange(e) {
    this.setState({
      login: e.target.value
    })
  }

  handleSignUp(e) {
    alert(`Welcome abord, ${this.state.login}!`)
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={e => this.handleChange(e)} />

        <Button onClick={e => this.handleSignUp(e)}>
          Sign Me Up!
        </Button>
      </Dialog>
    );
  }
}

export default SignUpDialog;
