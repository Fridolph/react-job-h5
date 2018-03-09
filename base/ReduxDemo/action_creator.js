import {ADD, JIAN} from './action'

export function add() {
  return {
    type: ADD
  }
}

export function jian() {
  return {
    type: JIAN
  }
}

export function addSync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}