import api from 'api'
import { GET_FLOORS } from './types'

export default {
  async [GET_FLOORS]({ commit }) {
    const result = await api.getFloors()
    commit(GET_FLOORS, result.data)
  }
}