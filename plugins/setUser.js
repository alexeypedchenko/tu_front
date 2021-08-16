import {
  getDoc,
} from '~/firebase/firebaseApi'

export const setUser = async (store, user) => {
  store.dispatch('auth/fireAuthAction', user)
  const userData = !!user ? await getDoc('users', user.uid) : null
  store.dispatch('auth/setUserData', userData)
}
