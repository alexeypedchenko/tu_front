export const state = () => ({
  activeInfoWindow: null,
  triggerInfoWindow: false,
})

export const mutations = {
  openInfoWindow(state, index) {
    state.activeInfoWindow = index
    state.triggerInfoWindow = !state.triggerInfoWindow
  },
}
