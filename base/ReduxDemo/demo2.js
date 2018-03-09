import {createStore} from 'redux'

// 1.新建store
// 通过reducer简历
// 根据老的state和action生成新的state
export default function counter(state = 0, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'jian':
      return state - 1
    default:
      return 0
  }
}

const store = createStore(counter)

const init = store.getState()

console.log(`初始状态： ${init}`)

function listener() {
  const current = store.getState()
  console.log('现在的状态是 => ' + current)
}
store.subscribe(listener)
store.dispatch({type: 'add'})
store.dispatch({type: 'add'})
