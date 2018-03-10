import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
// 组件
import AuthRoute from './Components/AuthRoute/AuthRoute'
import Login from './Container/Login/Login'
import Register from './Container/Register/Register'
import BossInfo from './Container/BossInfo/BossInfo'
import GeniusInfo from './Container/GeniusInfo/GeniusInfo'
import Dashboard from './Components/Dashboard/Dashboard'

class App extends Component {  
  render() {
    return (
      <div>
        {/* 权限校验 */}
        <AuthRoute />
        {/* boss页 genius页 个人中心 消息列表 */}

        {/* 登录 注册 及完善信息*/}
        <Switch>
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    )
  }
}

export default App
