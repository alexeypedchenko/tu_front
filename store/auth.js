export const state = () =>({
  user: null
})

export const mutations = {
  SIGN_OUT(state) {
    state.user = null
  },
  SIGN_IN(state, authUser) {
    const {
      uid,
      email,
      displayName,
      emailVerified,
    } = authUser

    state.user = {
      uid,
      email,
      displayName,
      emailVerified,
    }
  }
}

export const actions = {
  fireAuthAction({commit}, authUser) {
    if (!authUser) {
      commit('SIGN_OUT')
    } else {
      commit('SIGN_IN', authUser)
    }
  },
}
