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
          <button class="btn primary" @click="increment(product.id)">+</button>
          {{product.count}} шт.
          <button class="btn danger" @click="decrement(product.id)">-</button>
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
import {ref, computed, onMounted, reactive} from 'vue'
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

    onMounted(async () => {
      loading.value = true
      await store.dispatch('products/loadAllProducts')
      loading.value = false
    })

    const CART = reactive(CART_MODEL)

    let increment = function (id) {
      CART[id]++
    }

    let decrement = function (id) {
      CART[id]--
    }

    const keys = Object.keys(CART )
    const products = computed(() => store.getters['products/getProducts']
        .filter(product => {
          for(let elem of keys) {
            if (product.id === elem) {
              product.count = CART[product.id]
              return product
            }
          }
        })
        .filter(product => {
          if (product.count > 0) {
            return product
          }
        })
    )

      let sum = computed(() => {
        return products.value.reduce(function (sumAll, current) {
          return sumAll + current.count * current.price
        }, 0)
    })

    return {
      loading,
      currency,
      products,
      sum,
      increment,
      decrement
    }
  },
  components: {AppPage, AppLoader}
}
</script>

<style scoped>

</style>
