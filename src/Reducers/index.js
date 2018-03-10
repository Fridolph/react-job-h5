// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { user } from './user.redux'
import { chatuser } from './chatuser.redux'

export default combineReducers({
  user,
  chatuser
})
