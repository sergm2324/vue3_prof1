<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text" placeholder="Найти товар..." v-model="search">
      <span class="form-control-clear" @click="search = ''">&times;</span>
    </div>

    <ul class="list">
      <li class="list-item" :class = "currentCat === 'all' ? 'active' : ''" @click="currentType('all')">Все</li>
      <li class="list-item" :class = "currentCat === cat.type ? 'active' : ''" v-for = "cat in categories" :key="cat.id" @click="currentType(cat.type)">
        {{cat.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
export default {
name: "ProductsFilter",
  props: ['categories'],
  emits: ['modelValue'],
  setup(_, {emit}) {
    let currentCat = ref(localStorage.getItem('CAT') ?? 'all')
    let search = ref(localStorage.getItem('SEARCH') ?? '')

    const currentType = function (type) {
      currentCat.value = type
    }

    watch([currentCat, search], values => {
      emit('modelValue', {
        currentCat: values[0],
        search: values[1]
      })
    })

    return {
      currentCat,
      search,
      currentType
    }
  }
}
</script>

<style scoped>

</style>
