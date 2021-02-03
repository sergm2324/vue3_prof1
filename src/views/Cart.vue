<template>
  <app-loader v-if="loading" />
  <app-page back title="Корзина" v-else>
    <h3 class="text-center" v-if = "products.length === 0">В корзине пока ничего нет</h3>
    <table class="table">
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for = "product in products" :key="product.id">
        <td>{{product.title}}</td>
        <td>
          <button class="btn primary" @click="product.count++">+</button>
          {{product.count}} шт.
          <button class="btn danger" @click="product.count--">-</button>
        </td>
        <td>{{ currency(product.price) }}</td>
      </tr>
      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: {{ currency(sum) }}</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </app-page>
</template>

<script>
import AppPage from '../components/ui/AppPage'
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
import {currency} from '../utils/currency'
import AppLoader from '../components/ui/AppLoader'
const CART_MODEL = {
  '2': 3,
  '5': 1
}

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)
    const products = computed(() => store.getters['products/getProducts'])
      let sum = computed(() => {
        loading.value = true
        let all = 0
        for (let elem of products.value) {
          all += elem.count * elem.price
        }
        loading.value = false
        return all
      })

    return {
      loading,
      currency,
      products,
      sum
    }
  },
  components: {AppPage, AppLoader}
}
</script>

<style scoped>

</style>
