export const state = () => ({
})

export const mutations = {
  mutate(state, payload) {
    state[payload.prop] = payload.value
  },
}
