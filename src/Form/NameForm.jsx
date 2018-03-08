import React, { Component } from 'react';

class NameForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    alert('a name was submitted: ' + this.state.value)
  }

  handleChange(e) {
    this.setState({
      value: e.target.value.toUpperCase()
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            name: <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e)} />
          </label>
          <input type="submit" value="submit" />
        </form>     
      </div>
    );
  }
}

export default NameForm;
