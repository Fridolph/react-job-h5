// 合并所有的reducer 并且返回
import {combineReducers} from 'redux'
import { Counter } from '../ReduxDemo/counter.redux'
import { Auth } from './Autho.redux'

export default combineReducers({
  Counter,
  Auth
})