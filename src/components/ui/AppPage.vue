<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white">Вернуться в магазин</router-link>s
  </div>
  <div class="card">
    <h1 class="card-title">
      {{title}}
      <slot name="header" />
    </h1>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    document.title = `${props.title} | Магазин`
  }
}
</script>

<style scoped>

</style>
