import axios from 'axios'
import { getRedirectPath } from '../util/url'

// 定义常量
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

// 初始状态
const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

/* **************************** reducer *****************************/

/**
 * 改变用户登录状态
 */
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      }
    case LOAD_DATA:
      return { ...state, ...action.playload }
    case LOGOUT:
      return {...initState, redirectTo: '/login'}
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth: false }
    default:
      return state
  }
}

/* **************************** Action Creators *****************************/

function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}

function authSuccess(obj) {
  const { pwd, ...data } = obj
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

export function loadData(userinfo) {
  return {
    type: LOAD_DATA,
    payload: userinfo
  }
}

/**
 * 用户注册接口
 * @param {Object} 用户注册信息： 用户名，密码，确认密码，类型
 */
export function register({ user, pwd, rpwd, type }) {
  // 校验
  if (!user || !pwd || !type) return errorMsg('用户名密码必填')
  if (pwd !== rpwd) return errorMsg('两次密码不同')

  // 校验通过后进行异步请求处理
  return dispatch => {
    axios
      .post('/user/register', {
        user,
        pwd,
        type
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(
            authSuccess({
              user,
              pwd,
              type
            })
          )
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

/**
 * 用户登录接口
 * @param {Object} 用户登录，用户名，密码
 */
export function login({ user, pwd }) {
  if (!user || !pwd) return errorMsg('请填写用户名/密码')

  return dispatch => {
    axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// 更新数据
export function update(data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// 注销操作
export function logoutSubmit() {
  return {type: LOGOUT}
}