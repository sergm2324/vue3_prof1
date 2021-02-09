<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: tError}">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" @blur="tBlur">
      <small v-if="tError">{{tError}}</small>
    </div>

    <div class="form-control" :class="{invalid: iError}">
      <label for="img">Изображение</label>
      <input type="text" id="img" v-model="img" @blur="iBlur">
      <small v-if="iError">{{iError}}</small>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="price">Цена</label>
      <input type="number" id="price" v-model.number="price" @blur="pBlur">
      <small v-if="pError">{{pError}}</small>
    </div>

    <div class="form-control">
      <label for="cat">Категория</label>
      <select id="cat" v-model="cat">
        <option value="fruit">Фрукты</option>
        <option value="vegetable">Овощи</option>
        <option value="meat">Мясо</option>
        <option value="fish">Рыба</option>
        <option value="greens">Зелень</option>
        <option value="berries">Ягоды</option>
      </select>
    </div>

    <div class="form-control" :class="{invalid: cError}">
      <label for="count">Количество</label>
      <input type="number" id="count" v-model.number="count" @blur="cBlur">
      <small v-if="cError">{{cError}}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>

import {useProductForm} from '@/use/product-form'
import {useStore} from 'vuex'

export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()

    const submit = async values => {
      await store.dispatch('request/create', values)
      emit('created')
    }

    return {
      ...useProductForm(submit)
    }
  }
}
</script>

<style scoped>

</style>
