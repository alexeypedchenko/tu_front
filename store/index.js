export const state = () => ({
  lang: {
    filters: {
      name: 'Название места',
      town: 'Город',
      region: 'Регион',
      tags: 'Теги',
      type: 'Тип места',
    },
  },
  editedUserRoute: '',
  settingUserRoute: false,
})

export const mutations = {
  setEditedUserRoute(state, name) {
    state.editedUserRoute = name
  },
  toggleSettingUserRoute(state) {
    state.settingUserRoute = !state.settingUserRoute
  },
  mutate(state, payload) {
    state[payload.prop] = payload.value
  },
}
