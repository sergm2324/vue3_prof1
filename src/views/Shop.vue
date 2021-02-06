<template>
  <app-loader v-if="loading" />
  <div class="card" v-else>
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
    <div class="products-table">
      <div class="product-card" v-for = "product in products" :key="product.id" v-if="products.length">
        <div class="product-img">
          <img :src="product.img">
        </div>
        <h4 class="product-title">{{product.title}}</h4>
        <div class="text-center" v-if="product.count > 0">
          <button class="btn">{{ currency(product.price) }}</button>
          <!--          <div class="product-controls">-->
          <!--            <button class="btn danger">-</button>-->
          <!--            <strong>123</strong>-->
          <!--            <button class="btn primary">+</button>-->
          <!--          </div>-->
        </div>
        <div class="text-center" v-else>
          Нет в наличии
        </div>
      </div>
      <div class="text-center" v-else>
        Таких товаров нет.
      </div>
    </div>
  </div>
</template>

<script>
import AppPage from '../components/ui/AppPage'
import {ref, computed, onMounted, reactive} from 'vue'
import {useStore} from 'vuex'
import {currency} from '../utils/currency'
import {useRoute, useRouter} from 'vue-router'
import AppLoader from '../components/ui/AppLoader'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)
    let currentCat = ref('all')
    let search = ref(localStorage.getItem('SEARCH') ?? '')
    const route = useRoute()
    const router = useRouter()

    onMounted(async () => {
      loading.value = true
      await store.dispatch('products/loadAllProducts')
      await store.dispatch('categories/loadAllCategories')
      if (search.value) {
        router.push(`/search=${search.value}`)
      }
      loading.value = false
    })
    if (!search.value && route.params.search.replace('search=', '')) {
      search.value = route.params.search.replace('search=', '')
    }

    const currentType = function (type) {
      currentCat.value = type
    }

    function byField(field) {
      return (a, b) => a[field] < b[field] ? 1 : -1;
    }

    const products = computed(() => store.getters['products/getProducts']
        .sort(byField('count'))
        .filter(product => {
          if (product.category === currentCat.value) {
            return product
          } else if (currentCat.value === 'all') {
            return product
          }
        })
        .filter(product => {
          if (product.title.toLowerCase().indexOf(search.value, 0) >= 0) {
            router.push(`/search=${search.value}`)
            localStorage.setItem('SEARCH', search.value)
            return product
          } else if (search.value === '') {
            return product
          }
        })
    )

    const categories = computed(() => store.getters['categories/getCategories'])
    return {
      loading,
      currency,
      products,
      categories,
      currentCat,
      currentType,
      search
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
