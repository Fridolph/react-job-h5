import React from 'react'
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import App from '../App'
import PageA from './PageA'
import PageB from './PageB'

import {logout} from './Autho.redux'

const mapStateToProps = state => state.auth
const mapDispatchToProps = { logout }

@connect(mapStateToProps, mapDispatchToProps)
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <nav>
          <Link to="/dashboard/">首页</Link> | 
          <Link to="/dashboard/pageA">pageA</Link> | 
          <Link to="/dashboard/pageB">pageB</Link>
          {/* <Link to="/pageB">页面B</Link> */}
        </nav>
        <Route path="/dashboard/" exact component={App}></Route>
        <Route path="/dashboard/pageA/" component={PageA}></Route>
        <Route path="/dashboard/pageB/" component={PageB}></Route>
      </div>
    )
  }
}

export default Dashboard