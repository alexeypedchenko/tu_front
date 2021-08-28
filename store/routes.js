import { getUniqueCollection } from '~/utils/functions'
import {
  getCollection,
  createDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from '~/firebase/firebaseApi'

const IS_ARRAY = true
const collection = 'routes'

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
  filtredRoutes(state, getters, store) {
    const routes = state.list
    const filters = state.filters

    return routes.filter((place) => {
      let condition = true

      for (let [name, value] of Object.entries(filters)) {
        // 1. - если значение фильтра пустое переходим к следующему фильтру.
        if (!value) continue

        let prop = place[name]

        // 2. - если значение фильтра не пустое и объект 'place' по ключу фильтра не имеет вхождений
        // значит условие не соответствует => исключаем объект из фильтра.
        if (
          (name !== 'name' && typeof prop === 'string' && prop !== value)
          || (name !== 'name' && typeof prop === 'object' && !prop.includes(value))
        ) {
          condition = false
        }

        // 3. - Фильтр поиска имеет ключ 'name'
        // приводим поле поиска и поля обьекта к нижнему регистру
        if (name === 'name') {
          value = value.toLowerCase().trim()
          prop = prop.toLowerCase().trim()

          if (!prop.includes(value)) {
            condition = false
          }
        }

        // 4. - примечание!
        // Объект 'place' обязательно должен иметь такие же ключи как и объект 'filters'.
      }

      return condition
    })
  },
  getFilters(state) {
    return state.filters
  },
  getFilterList(state) {
    // собираем списки фильтров по ключам из списка элементов
    const routes = state.list
    const filterTypes = Object.keys(state.filters)
    const filterList = {}

    for(const key of filterTypes) {
      if (key === 'name') {
        continue
      }

      switch (typeof routes[0][key]) {
        case 'string':
          filterList[key] = getUniqueCollection(routes, key)
          break
        case 'object':
          filterList[key] = getUniqueCollection(routes, key, IS_ARRAY)
          break
        default:
          break
      }
    }

    return filterList
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
