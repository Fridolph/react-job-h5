import {createStore} from 'redux'

// 这就是reducer处理函数，参数是状态和新的action
function counter(state = 0, action) {
  switch (action.type) {
    case 'increase': 
      return state + 1
    case 'decrease':
      return state - 1
    default:
      return 10
  }
}

// 新建store
const store = createStore(counter)

// 管理状态
const init = store.getState()

function listener() {
  const current = store.getState()
}

// 订阅，每次state修改，都会执行listener
store.subscribe(listener)

// 提交状态变更的申请
store.dispatch({type: 'increase'})
store.dispatch({type: 'increase'})
store.dispatch({type: 'decrease'})