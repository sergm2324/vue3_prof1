<template>
  <app-loader v-if="loading" />
  <app-page title="Shop" v-else>
    <div v-for="product in products" :key="product.id">
      {{product.title}}
    </div>
  </app-page>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import AppPage from '../components/ui/AppPage'
import AppLoader from '../components/ui/AppLoader'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)
    onMounted(async () => {
      loading.value = true
      await store.dispatch('products/loadAllProducts')
      loading.value = false
    })
    return {
      loading,
      products: computed(() => store.getters['products/getProducts'])
    }
  },
  components: {
    AppPage, AppLoader
  }
}
</script>
