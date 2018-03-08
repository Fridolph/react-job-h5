import React, { Component } from 'react';

class Reservation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    }
  }

  handleSubmit(e) {
    e.preventDefault()
  }
  
  handleInputChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name    
    console.log(e.target)
    this.setState({
      [name]: value
    })
  }



  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <label> 
          Is going: 
          <input type="checkbox" name="isGoing" checked={this.state.isGoing} onChange={e => this.handleInputChange(e)} />
        </label>
        <br/>
        <label>
          Number of Guests:
          <input type="number" name="numberOfGuests" value={this.state.numberOfGuests} onChange={e => this.handleInputChange(e)} />
        </label>
      </form>
    );
  }
}

export default Reservation;
