<template>
  <app-loader v-if="loading" />
  <div class="card" v-else>
    <div class="products-filter">
      <div class="form-control">
        <input type="text" placeholder="Найти товар...">
        <span class="form-control-clear">&times;</span>
      </div>

      <ul class="list">
        <li class="list-item">Все</li>
        <li class="list-item" v-for = "cat in categories" :key="cat.id">
          {{cat.title}}
        </li>
      </ul>
    </div>
    <div class="products-table">
      <div class="product-card" v-for = "product in products" :key="product.id">
        <div class="product-img">
          <img :src="product.img">
        </div>
        <h4 class="product-title">{{product.title}}</h4>
        <div class="text-center">
          <button class="btn">{{product.count}}</button>
          <!--          <div class="product-controls">-->
          <!--            <button class="btn danger">-</button>-->
          <!--            <strong>123</strong>-->
          <!--            <button class="btn primary">+</button>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppPage from '../components/ui/AppPage'
import {ref, computed, onMounted, reactive} from 'vue'
import {useStore} from 'vuex'
import {currency} from '../utils/currency'
import AppLoader from '../components/ui/AppLoader'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      await store.dispatch('products/loadAllProducts')
      await store.dispatch('categories/loadAllCategories')
      loading.value = false
    })

    function byField(field) {
      return (a, b) => a[field] < b[field] ? 1 : -1;
    }

    const products = computed(() => store.getters['products/getProducts']
        .sort(byField('count'))
    )



    const categories = computed(() => store.getters['categories/getCategories'])
    return {
      loading,
      currency,
      products,
      categories
    }
  },
  components: {AppPage, AppLoader}
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>
