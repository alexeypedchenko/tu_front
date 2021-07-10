export const state = () => ({
  smallHeaer: false,
  lang: {
    filters: {
      name: 'Название места',
      town: 'Город',
      region: 'Регион',
      tags: 'Теги',
      type: 'Тип места',
    },
  },
})

export const mutations = {
  smallHeader(state, prop) {
    state.smallHeaer = prop
  },
  mutate(state, payload) {
    state[payload.prop] = payload.value
  },
}
