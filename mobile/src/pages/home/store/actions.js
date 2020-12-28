import axios from 'axios'

export default {
  async loadItem({ commit }) {
    const result = await axios.get('http://127.0.0.1:3000')
    commit('loadItem', result.data)
  }
}