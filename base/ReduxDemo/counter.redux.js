import {ADD, JIAN} from './action'

export function Counter(state = {num: 10}, action) {
  switch (action.type) {
    case ADD:
      return state.num + 1
    case JIAN:
      return state.num - 1
    default:
      return 10
  }
}
