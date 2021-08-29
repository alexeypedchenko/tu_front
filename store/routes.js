import { filtredItems, filterList } from '~/utils/store'

import {
  getCollection,
  createDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from '~/firebase/firebaseApi'

const collection = 'routes'

export const state = () => ({
  dataLoaded: false,
  loading: false,
  list: [],
  filters: {
    name: '',
    tags: '',
    region: '',
  },
})

export const getters = {
  filtredRoutes(state) {
    return filtredItems(state)
  },
  getFilters(state) {
    return state.filters
  },
  getFilterList(state) {
    return filterList(state)
  },
}

export const mutations = {
  mutate(state, payload) {
    state[payload.property] = payload.value;
  },
  loadingStart(state) {
    state.loading = true
  },
  loadingEnd(state) {
    state.loading = false
  },
  clearFilters(state) {
    Object.keys(state.filters).forEach((key) => {
      state.filters[key] = ''
    })
  },
  setFilterValue(state, {name, value}) {
    state.filters[name] = value
  },
}

export const actions = {
  async getCollection({ commit }) {
    commit('loadingStart')
    await getCollection(collection)
      .then((data) => {
        commit('mutate', {
          property: 'list',
          value: data
        })
        commit('mutate', {
          property: 'dataLoaded',
          value: true
        })
      })
      .catch((err) => console.log('err:', err))
      .finally(() => commit('loadingEnd'))
  },
}
