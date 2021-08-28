export default async function ({store}) {
  try {
    await store.dispatch('markers/getCollection')
    await store.dispatch('places/getCollection')
    await store.dispatch('routes/getCollection')
    console.warn('data loaded')
  } catch (err) {
    console.log('err:', err)
  }
}
