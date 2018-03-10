// 依赖
import axios from 'axios'
// 定义常量
const USER_LIST = 'USER_LIST'

const initState = {
  userlist: []
}

// ActionCreator
export function getUserList(type) {
  return dispatch => {
    axios.get(`/user/list?type=${type}`).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(userList(res.data.data))
      }
    })
  }
}

// action
function userList(data) {
  return {
    type: USER_LIST,
    payload: data
  }
}

/* **************************** reducer *****************************/

export function chatuser(state = initState, action) {
  switch(action.type) {
    case USER_LIST:
      return {...state, userlist: action.payload}
    default:
      return state
  }
}