<template>
  <div class="dynamic-blocks" v-show="publishedBlocks.length">
    <div
      class="dynamic-block"
      v-for="(item, index) in publishedBlocks"
      :key="`dynamic-block-${index}`"
    >
      <page-text v-if="item.type === 'text'" :text="item.props.text" />
      <page-image v-if="item.type === 'image'" :image="item.props.image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicBlocks',
  props: {
    blocks: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    publishedBlocks() {
      return this.blocks.filter((block) => block.published)
    }
  },
  mounted() {
    console.log('this.blocks:', this.blocks)
  }
}
</script>

<style>
.dynamic-block {
  margin-bottom: 40px;
}
</style>