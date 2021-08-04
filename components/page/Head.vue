<template>
  <div class="page-head">
    <div class="page-head__text">
      <h2 class="page-head__title">
        {{ title }}
      </h2>
      <p class="page-head__description">
        {{ description }}
      </p>
    </div>

    <img
      class="page-head__image"
      :src="image"
      :alt="title"
    >
  </div>
</template>

<script>
export default {
  name: 'PageHead',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  }
}
</script>

<style lang="scss">
.page-head {
  position: relative;
  width: calc(100vw - 80px);
  margin: 40px auto 40px;
  border-radius: 10px;
  overflow: hidden;
}
.page-head__image {
  width: 100%;
  height: 600px;
  object-fit: cover;
  display: block;
}
.page-head__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 80px;
  background: linear-gradient(to bottom, rgba(#000, 0.5), transparent);
  color: #fff;
}
.page-head__title {
  margin-bottom: 10px;
}
.page-head__description {}

</style>
