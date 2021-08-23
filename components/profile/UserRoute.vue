<template>
  <div class="user-route">
    <div class="user-route__head">
      <h4 class="user-route__name">
        {{ userRoute.name }}
      </h4>
      <button @click="$emit('back')">
        Назад ⟵
      </button>
      <!-- TODO удаление маршрута -->
    </div>
    <div class="user-route__body">
      <h4>
        Места:
      </h4>
      <div class="user-route__places">
        <div
          class="user-route__place"
          v-for="(item, index) in userRoutePlaces"
          :key="item.id"
        >
          <div>
            {{ index + 1 }}.
            <!-- TODO удаление места из маршрута -->
            <!-- TODO изменить порядковый номер места -->
          </div>
          <card
            :index="index"
            :item="item"
          />
        </div>
        <!-- TODO добавить новое место -->
      </div>
      <h4>
        Маршрут:
      </h4>
      <div class="user-route__map">
        <google-map
          :items="userRoutePlaces"
          :showRoute="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserRoutes',
  props: {
    userRoute: {
      type: Object,
      default: null,
    }
  },
  computed: {
    ...mapState('markers', [
      'list',
    ]),
    userRoutePlaces() {
      return this.list.filter((marker) => this.userRoute.list.includes(marker._id))
    },
  }
}
</script>

<style lang="scss">
.user-route {}
.user-route__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.user-route__name {}
.user-route__body {
  h4 {
    margin-bottom: 10px;
  }
}
.user-route__places {
  display: flex;
  flex-wrap: wrap;
}
.user-route__place {
  margin-right: 16px;
  margin-bottom: 16px;
  .card {
    width: 280px;
  }
}
.user-route__map {
  .google-map {
    margin-bottom: 0;
  }
}
</style>
