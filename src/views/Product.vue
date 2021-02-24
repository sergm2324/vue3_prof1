<template>
  <app-page back :title="product['title']" v-if="product">
    <img :src="product['img']" />
    <p>Категория: <strong>{{product['category']}}</strong></p>
    <button class="btn">
      {{ currency(product['price']) }}
    </button>
<!--    <div class="product-controls in-card">-->
<!--      <button class="btn danger">-</button>-->
<!--      <strong>12</strong>-->
<!--      <button class="btn primary">+</button>-->
<!--    </div>-->
  </app-page>
  <h3 class="text-center text-white" v-else>
    Товара не найден.
  </h3>
</template>

<script>
import AppPage from '../components/ui/AppPage'
import {computed} from 'vue'
import { useStore } from 'vuex'
import {currency} from '@/utils/currency'
export default {
  props: ['productId'],
  setup(props) {
    const store = useStore()

    return {
      currency,
      product: computed(() => store.getters['products/getProducts'].find(e => e.id === props.productId)).value,
    }
  },
  components: {AppPage}
}
</script>

<style scoped>

</style>
