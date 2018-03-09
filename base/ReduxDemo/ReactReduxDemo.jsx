import React from 'react'

// import Game from './Tgame/Game'
// import demo2 from './ReduxDemo/demo2'
// import {add, jian, addSync} from './ReduxDemo/action_creator'

// redux 
import {connect} from 'react-redux'
import {add, jian, addSync} from './action_creator'

const mapStateToProps = state => {
  return state.num
}
const mapDispatchToProps = {
  add,
  jian,
  addSync
}
// 1 属性 要state什么属性放到props里
// 2 方法，放到props里自动dispatch
@connect(mapStateToProps, mapDispatchToProps)
class ReactReduxDemo extends React.Component {
  
  render() {        
    return (
      <div>
        <h2>现在有Counter: {this.props.num}</h2>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.jian}>-</button>
        <button onClick={this.props.addSync}>异步+</button>
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

// ReactReduxDemo = connect(mapStatetoProps, actionCreator)(ReactReduxDemo)

// 装饰器模式
export default ReactReduxDemo
