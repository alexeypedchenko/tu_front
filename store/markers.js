import { getUniqueCollection } from '~/utils/functions'
import {
  getCollection,
  createDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from '~/firebase/firebaseApi'

const IS_ARRAY = true
const collection = 'markers'

export const state = () => ({
  dataLoaded: false,
  loading: false,
  list: [],
  filters: {
    name: '',
    type: '',
    tags: '',
    town: '',
    region: '',
  },
})

export const getters = {
  filtredMarkers(state, getters, store) {
    const markers = state.list
    const filters = state.filters

    return markers.filter((place) => {
      let condition = true

      for (let [name, value] of Object.entries(filters)) {
        // 1. - если значение фильтра пустое переходим к следующему фильтру.
        if (!value) continue

        let prop = place[name]

        // 2. - Фильтр поиска имеет ключ 'name'
        // приводим поле поиска и поля обьекта к нижнему регистру
        if (name === 'name') {
          value = value.toLowerCase().trim()
          prop = prop.toLowerCase().trim()
        }

        // 3. - если значение фильтра не пустое и объект 'place' по ключу фильтра не имеет вхождений
        // значит условие не соответствует => исключаем объект из фильтра.
        if (value && !prop.includes(value)) {
          condition = false
          break
        }

        // 3. - примечание!
        // Объект 'place' обязательно должен иметь такие же ключи как и в фильтре.
      }

      return condition
    })
  },
  getFilterList(state) {
    return state.filters
  },
  getFilters(state) {
    const markers = state.list
    const filterTypes = Object.keys(state.filters)
    const filters = {}

    for(const key of filterTypes) {
      if (key === 'name') {
        continue
      }

      switch (typeof markers[0][key]) {
        case 'string':
          filters[key] = getUniqueCollection(markers, key)
          break
        case 'object':
          filters[key] = getUniqueCollection(markers, key, IS_ARRAY)
          break
        default:
          break
      }
    }

    return filters
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
