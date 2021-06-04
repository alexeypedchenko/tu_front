export default function ({ store, redirect }) {
  const { user } = store.state.auth
  if (!user) {
    redirect({ path: '/login' })
  }
}
