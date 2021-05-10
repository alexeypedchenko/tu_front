import Vue from 'vue'
// import Tags from '~/components/elements/Tags'
// import CControl from '~/components/form/CControl'
// import CMultiselect from '~/components/form/CMultiselect'

const components = {
  // for example
  // AppTags: Tags,
  // CControl,
  // CMultiselect,
}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})