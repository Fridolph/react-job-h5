import React, {PureComponent} from 'react'
import {render} from 'react-dom'
import Todo from './todo/index'

class App extends PureComponent {
  render() {
    return (
      <div>
        
        <Todo></Todo>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
)