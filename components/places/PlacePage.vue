<template>
  <div class="place-page">
    <div class="container">
      <div v-if="item.tags" class="place-page__tags">
        <div
          v-for="tag in item.tags"
          :key="tag"
          class="place-page__tag"
        >
          {{ tag }}
        </div>
      </div>
      <img v-if="item.img" class="place-page__img" :src="item.img" :alt="item.name" >
      <div v-if="item.name" class="place-page__title">
        {{ item.name }}
      </div>
      <div v-if="item.description" class="place-page__description">
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss">
.place-page {
}
.place-page__tags {
  display: flex;
  margin-bottom: 10px;
}
.place-page__tag {
  font-size: 12px;
  padding: 5px 15px;
  border: 1px solid #000;
  border-radius: 20px;
  margin-bottom: 10px;
  &:not(:last-child) {
    margin-right: 10px;
  }
}
.place-page__img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
  margin-bottom: 20px;
}
.place-page__title {
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 20px;
}
.place-page__description {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 40px;
}
</style>
