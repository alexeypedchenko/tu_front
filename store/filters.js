import { getUniqueCollection } from '~/utils/functions'
const IS_ARRAY = true

export const state = () => ({
  name: '',
  tags: '',
  region: '',
  town: '',
})

export const getters = {
  getTags(state, getters, store) {
    return getUniqueCollection(store.places.list, 'tags', IS_ARRAY)
  },
  getTowns(state, getters, store) {
    return getUniqueCollection(store.places.list, 'town')
  },
  getRegions(state, getters, store) {
    return getUniqueCollection(store.places.list, 'region')
  },
}

export const mutations = {
  clearFilters(state) {
    Object.keys(state).forEach((key) => {
      state[key] = ''
    })
  },

  setFilterValue(state, {name, value}) {
    state[name] = value
  },
}
