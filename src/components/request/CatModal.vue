<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: tError}">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" @blur="tBlur">
      <small v-if="tError">{{tError}}</small>
    </div>

    <div class="form-control" :class="{invalid: cError}">
      <label for="type">Категория</label>
      <input type="text" id="type" v-model="type" @blur="cBlur">
      <small v-if="cError">{{cError}}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>

import {useCategoryForm} from '@/use/category-form'
import {useStore} from 'vuex'

export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()

    const submit = async values => {
      await store.dispatch('categories/create', values)
      emit('created')
    }

    return {
      ...useCategoryForm(submit)
    }
  }
}
</script>

<style scoped>

</style>
