### 实现简易的 redux

```js
export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore(reducer))
  }

  let currentState = {}
  let currentListeners = []

  function getState() {
    return currentState
  }

  function subscribe() {
    currentListeners.push(listener)
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListener.forEach(v => v())
    return action
  }

  dispatch({type: '@MY-REDUX'})
  return { getState, subscribe, dispatch }
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
  let bound = {}
  Object.keys(creators).forEach(v => {
    let creator = creators[v]
    bound[v] = bindActionCreator(creator, dispatch)
  })
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    // 1. 生成createStore
    const store = createStore(...args)
    // 2. 把原生(redux)的dispatch方法拿出来
    let dispatch = store.dispatch
    // 3. 函数柯里化 - 对它们进行扩展
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 4. 拿到 middleware内部
    // 第一层把扩展后的两方法拿进去, 第二层是原本的dispatch
    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewareChain)(store.dispatch)
    // dispatch = middleware(midApi)(store.dispatch)(action)
    // 5. 最后把原生的store, dispatch覆盖掉再返回出去
    return {
      ...store,
      dispatch
    }
  }
}
// compose(fn1, fn2, fn3) => fn1(fn2(fn3))
export function compose(...funcs) {
  if (funcs.length === 0) return arg => arg
  if (funcs.length === 1) return funcs[0]

  return funcs.reduce((ret, item) => (...args) => ret(item(...args)))
}
```

主要函数 createStore, 接受两个参数， reducer, enhancer

reducer 正式处理数据， 最终的createStore返回一个对象store {getState, subscribe, dispatch}

如果有中间件，就用enhancer包一层，进行额外处理，再返回createStore



### 实现简易 react-redux

react-redux

connect负责连接组件，给到redux里的数据放到组件的props里
1. 负责接收一个组件，把state里的一些数据放进去，返回一个组件
2. 数据变化时，能够通知组件

```js
// function 写 connect
// export function connect(mapStateToProps, mapDispatchToProps) {
//   return function (WrapComponent) {
//     return class ConnectComponent extends Component {

//     }
//   }
// }
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  return class extends Component {
    static conextType = {
      store: PropTypes.object
    }
    constructor(props, context) {
      super(props)
      this.state = {
        props: {}
      }
    }
    uodate() {
      // 获取mapStateToProps, mapDispatchToProps 的值放入props里
      const {store} = this.context
      const stateProps = mapStateToProps(store.getState())
      // 方法不能直接给，需要dispatch
      // 直接执行add()无用， 要add = () => store.dispatch(add()) 才行
      // 其实就是用dispatch把 ActionCreator包了一层
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {...this.state.props, ...stateProps, ...dispatchProps}
      })
    }
    render() {
      <WrapComponent {...this.state.props} />
    }
    componentDidMount() {
      const {store} = this.context
      store.subscribe(() => this.update())
      this.update() 
    }
  }
}
```


Provider，把store放到context里，所有的子元素都可以取到store，所以要放在最顶层

connect是一个高阶函数, 第一层接受两个参数：
mapStateToProps  redux里需要的数据的映射
mapDisatchToProps  redux里需要的操作方法的映射

第二层也是一个高阶函数，接受一个外部的 Component
其内部是从 Provider拿到store，使用getState获取当前状态
根据第一个参数mstp 获取组件需要的状态放到props里
根据第二个参数, 用bindActionCreator 把返回的原始的action，包装成可以自动dispatch的函数

(bindActionCreator) 遍历传进来的所有creators，把原本的action变成 dispatch(actionCreator) 这样的函数

如果要加入中间件机制 applyMiddleware
applyMiddleware可以接受多个参数，把每个参数收集起来，变成一个中间件的数组，然后遍历该数组，对其分别传递原本的dispatch，再传递一层store.dispatch，对外返回 {...store, dispatch}

---

处理异步 迷你thunk

redux 三层箭头函数

第一层参数是一个对象，{dispatch, getState} 
第二层 next  只要有调用第二层 next，我们就执行下一个中间件
第三层 action，最后 dispatch的action