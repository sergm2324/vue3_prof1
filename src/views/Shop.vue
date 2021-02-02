<template>
  <app-loader v-if="loading" />
  <app-page title="Shop" v-else>
    <button class="btn" @click="loadProducts">Загрузить</button>
    <div v-for="product in products" :key="product.id">
      {{product.title}}
    </div>
  </app-page>
</template>

<script>
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
import AppPage from '../components/ui/AppPage'
import AppLoader from '../components/ui/AppLoader'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)
    return {
      loading,
      loadProducts: () => {store.dispatch('products/loadAllProducts')},
      products: computed(() => store.getters['products/getProducts'])
    }
  },
  components: {
    AppPage, AppLoader
  }
}
</script>
