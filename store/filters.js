import { getUniqueCollection } from '~/utils/functions'

export const state = () => ({
  name: '',
  tags: '',
  region: '',
  town: '',
})

export const getters = {
  getTags(state, getters, store) {
    return getUniqueCollection(store.places.data, 'tags', true)
  },
  getTowns(state, getters, store) {
    return getUniqueCollection(store.places.data, 'town')
  },
  getRegions(state, getters, store) {
    return getUniqueCollection(store.places.data, 'region')
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
