import React, {PureComponent} from 'react'
import List from './list'
import InputArea from './inputArea'

export default class Todo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }    
    this.addTitle = this.addTitle.bind(this)
  }

  addTitle(title) {
    this.setState({
      list: this.state.list.concat(title)
    })
  }  

  render() {
    const list = this.state.list
    return (
      <div>
        <p>this is todo component</p>
        <InputArea addTitle={this.addTitle} />
        <List list={list} />
      </div>
    )
  }
}