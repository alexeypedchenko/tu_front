export const setUser = (store, user) => {
  store.dispatch('auth/fireAuthAction', user)
}
