import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import 'antd-mobile/dist/antd-mobile.css'
// import Clock from './components/Clock'
import registerServiceWorker from './registerServiceWorker'

// import App from './App'
// redux demo
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// router
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
// import Auth from './RouteDemo/Auth'
import Dashboard from './RouteDemo/Dashboard'

// 合并reducers
import {Counter} from './ReduxDemo/counter.redux'
// import {Auth} from './RouteDemo/Autho.redux'
// redux-devtools
const store = createStore(
  // Auth,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <Dashboard />
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)

registerServiceWorker()
