import {
  getCollection,
  createDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from '~/firebase/firebaseApi'

const collection = 'places'

export const state = () => ({
  dataLoaded: false,
  loading: false,
  list: [],
})

export const getters = {
  filtredPlaces(state, getters, store) {
    const places = state.list
    const { filters } = store

    return places.filter((place) => {
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
  }
}

export const mutations = {
  loadingStart(state) {
    state.loading = true
  },
  loadingEnd(state) {
    state.loading = false
  },
  mutate(state, payload) {
    state[payload.property] = payload.value;
  },
  setNewPlace(state, newPlace) {
    state.list.push(newPlace)
  }
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
