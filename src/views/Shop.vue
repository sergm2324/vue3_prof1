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
        <router-link :to="'/product/' + product.id">
        <div class="product-img">
          <img :src="product.img">
        </div>
        </router-link>
        <h4 class="product-title">{{product.title}}</h4>
        <div class="text-center" v-if="product.count > 0">
          <button class="btn" @click="selectProduct(product.id)" v-if="currentProductId !== product.id">{{ currency(product.price) }}</button>
                    <div class="product-controls" v-if="showProductControls && currentProductId === product.id">
                      <button class="btn danger">-</button>
                      <strong>123</strong>
                      <button class="btn primary">+</button>
                    </div>
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
    let currentCat = ref(localStorage.getItem('CAT') ?? 'all')
    let search = ref(localStorage.getItem('SEARCH') ?? '')
    let showProductControls = ref(false)
    let currentProductId = ref(null)
    const route = useRoute()
    const router = useRouter()

    onMounted(async () => {
      loading.value = true
      await store.dispatch('products/loadAllProducts')
      await store.dispatch('categories/loadAllCategories')
      if (search.value) {
        router.push(`/?search=${search.value}&category=${currentCat.value}`)
      }
      loading.value = false
    })

    if (route.query.search) {
      search.value = route.query.search
    }

    const currentType = function (type) {
      currentCat.value = type
    }

    if (route.query.category) {
      currentCat.value = route.query.category
    }

    function byField(field) {
      return (a, b) => a[field] < b[field] ? 1 : -1;
    }

    const selectProduct = function (productId) {
      showProductControls.value = true
      currentProductId.value = productId
    }

    const products = computed(() => store.getters['products/getProducts']
        .sort(byField('count'))
        .filter(product => {
          router.push(`/?search=${search.value}&category=${currentCat.value}`)
          localStorage.setItem('CAT', currentCat.value)
          if (product.category === currentCat.value) {
            return product
          } else if (currentCat.value === 'all') {
            return product
          }
        })
        .filter(product => {
          if (product.title.toLowerCase().indexOf(search.value, 0) >= 0) {
            if (search.value) {
              router.push(`/?search=${search.value}&category=${currentCat.value}`)
              localStorage.setItem('SEARCH', search.value)
            } else {
              router.push('/')
              localStorage.removeItem('SEARCH')
            }
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
      search,
      showProductControls,
      currentProductId,
      selectProduct
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
