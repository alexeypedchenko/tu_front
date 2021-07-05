export const state = () => ({
  lang: {
    filters: {
      name: 'Введите название места',
      town: 'Город',
      region: 'Регион',
      tags: 'Теги',
      type: 'Тип места',
    },
  },
})

export const mutations = {
  mutate(state, payload) {
    state[payload.prop] = payload.value
  },
}
