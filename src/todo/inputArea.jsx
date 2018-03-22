import React, {PureComponent} from 'react'

export default class InputArea extends PureComponent {
  constructor(props) {
    super(props)    
    this.state = {
      title: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  handleClick(e) {
    const title = this.state.title
    if (!title) return
    this.props.addTitle(title)
    this.setState({
      title: ''
    })
  }

  render() {
    return (
      <div>
        <input name="title" id="title" value={this.state.title} onChange={this.handleChange} />
        <button onClick={this.handleClick}>addList</button>
      </div>
    )
  }
}