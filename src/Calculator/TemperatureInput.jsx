import React, { Component } from 'react'
// import BoilingVerdict from './BoilingVerdict'
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

class TemperatureInput extends Component {
  constructor(props) {
    super(props)    
  }

  handleChange(e) {
    // this.setState({
    //   temperature: e.target.value
    // })
    this.props.onTemperatureChange(e.target.value)
  }

  render() {
    const temperature = this.props.temperature
    const scale = this.props.scale

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]} : </legend>
        <input
          type="number"
          value={temperature}
          onChange={e => this.handleChange(e)}
        />        
      </fieldset>
    )
  }
}

export default TemperatureInput
