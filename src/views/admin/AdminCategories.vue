<template>
  <app-loader v-if="loading" />
  <div class="card" v-else>
    <ProductsFilter :categories="categories" @modelValue="currentCat=$event.currentCat; search=$event.search"/>
    <ProductsList :products="products"/>
  </div>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import {ref, computed, onMounted, reactive} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import AppLoader from '@/components/ui/AppLoader'
import ProductsFilter from '@/components/products/ProductsFilter'
import ProductsList from '@/components/products/ProductsList'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)
    let currentCat = ref(localStorage.getItem('CAT') ?? 'all')
    let search = ref(localStorage.getItem('SEARCH') ?? '')
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

    if (route.query.category) {
      currentCat.value = route.query.category
    }

    function byField(field) {
      return (a, b) => a[field] < b[field] ? 1 : -1;
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
      products,
      categories,
      currentCat,
      search,
    }
  },
  components: {AppPage, AppLoader, ProductsFilter, ProductsList}
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>
