import Vue from 'vue'
// import {mapState} from 'vuex'
// import {mapGetters} from 'vuex'

Vue.mixin({
  computed: {
    // ...mapState(['value']),
    // ...mapGetters(['value']),
    getPlaces() {
      return this.$store.state.demo.places.data
    }
  },
  methods: {
  },
  filters: {
    cutText(string, maxLength = 20) {
      return string.length < maxLength ? string : string.slice(0, maxLength) + '...'
    }
  },
})