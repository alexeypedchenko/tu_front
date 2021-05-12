export const state = () => ({
  search: '',
  tag: '',
  tags: [
    'tag 1',
    'tag 2',
    'tag 3',
    'tag 4',
  ],
})

export const mutations = {
  clearFilters(state) {
    state.tag = ''
    state.search = ''
  },
  searchFilter(state, value) {
    state.search = value
  },
  tagFilter(state, tag) {
    state.tag = tag
  },
}
