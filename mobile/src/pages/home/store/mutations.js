export default {
  loadItem(state, payload) {
    state.list = payload
  },
  addItem(state, payload) {
    state.list.push(payload)
  },
  delItem(state, payload) {
    state.list = state.list.filter(item=>item.id != payload)
  }
}