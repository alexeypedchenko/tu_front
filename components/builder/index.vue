<template>
  <div class="builder" v-show="publishedBlocks.length">
    <div class="container">
      <template v-for="(item, index) in publishedBlocks">
        <builder-text
          v-if="item.type === 'text'"
          :key="`text-${index}`"
          :text="item.props.text"
        />
        <builder-image
          v-if="item.type === 'image'"
          :key="`image-${index}`"
          :image="item.props.image"
        />
        <builder-texteditor
          v-if="item.type === 'texteditor'"
          :key="`texteditor-${index}`"
          :text="item.props.texteditor"
        />
        <br :key="`first-br-${index}`">
        <br :key="`second-br-${index}`">
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Builder',
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