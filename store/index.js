export const state = () => ({
  activeInfoWindow: null,
  triggerInfoWindow: false,
  hoveredMarker: null,
})

export const mutations = {
  openInfoWindow(state, index) {
    state.activeInfoWindow = index
    state.triggerInfoWindow = !state.triggerInfoWindow
  },
  showHoveredMarker(state, data) {
    console.log('data:', data)
    state.hoveredMarker = data
  }
}
