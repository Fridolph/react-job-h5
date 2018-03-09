import React, {Component} from 'react'
import ReactReduxDemo from './ReduxDemo/ReactReduxDemo'
// import Game from './Tgame/Game'
// import demo2 from './ReduxDemo/demo2'
// import {add, jian, addSync} from './ReduxDemo/action_creator'


class App extends Component {
  
  render() {        
    return (
      <div>
        <ReactReduxDemo />
      </div>
    )
  }
}

// const mapStatetoProps = state => {
//   return  {
//     num: state
//   }
// }
// const actionCreator = {
//   add,
//   jian,
//   addSync
// }

// App = connect(mapStatetoProps, actionCreator)(App)

// 装饰器模式
export default App
