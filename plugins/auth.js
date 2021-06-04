import {setUser} from '~/plugins/setUser'
import {authStateChanged} from '~/firebase/userApi'

export default async function ({store}) {
  await authStateChanged().then((user) => {
    if (!!user) {
      setUser(store, user)
    }
  })
}
