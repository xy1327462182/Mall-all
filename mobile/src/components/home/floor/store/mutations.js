import { GET_FLOORS } from './types'

export default {
  [GET_FLOORS](state, payload) {
    state.floors = payload
  }
}