import React, { Component } from 'react'

export default function ImoocForm(Comp) {
  return class WrapperComp extends Component {
    constructor(props) {
      super(props);
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(key, value) {
      // console.log(`key: ${key}\nvalue: ${value}`)
      this.setState({
        [key]: value
      })
    }
    
    render() {
      return (
        <Comp handleChange={this.handleChange} state={this.state} {...this.props} />
      )
    }
  }  
}
