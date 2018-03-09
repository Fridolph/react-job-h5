import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import 'antd-mobile/dist/antd-mobile.css'
// import Clock from './components/Clock'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()
