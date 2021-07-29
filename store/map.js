export const state = () => ({
  init: false,
  activeInfoWindow: null,
  triggerInfoWindow: false,
  hoveredMarker: null,
  hoveredMarkerIndex: null,
})

export const getters = {
  isMapInit(state) {
    return state.init
  }
}

export const mutations = {
  openInfoWindow(state, index) {
    state.activeInfoWindow = index
    state.triggerInfoWindow = !state.triggerInfoWindow
  },
  showHoveredMarker(state, data) {
    state.hoveredMarker = data
  },
  setHoveredMarkerIndex(state, index) {
    state.hoveredMarkerIndex = index
  },
  mapInit(state) {
    state.init = true
  },
  mapDestroy(state) {
    state.init = false
  },
}
