import React, { Component } from 'react';
import TemperatureInput from './TemperatureInput';
import BoilingVerdict from './BoilingVerdict'

class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scale: 'c',
      temperature: ''
    }
  }

  handleCelsiusChange(temperature) {
    this.setState({
      scale: 'c',
      temperature
    })
  }

  handleFahrenheitChange(temperature) {
    this.setState({
      scale: 'f',
      temperature
    })
  }

  render() {
    const scale = this.state.scale
    const temperature = this.state.temperature
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature
    return (
      <div>
        <TemperatureInput temperature={celsius} onTemperatureChange={temperature => this.handleCelsiusChange(temperature)} scale="c" />
        <TemperatureInput temperature={fahrenheit} onTemperatureChange={temperature => this.handleFahrenheitChange(temperature)} scale="f" />

        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit(celsius) {
  return celsius * 9 / 5 + 32
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

export default Calculator;
