<template>
  <app-loader v-if="loading" />
  <app-page title="Админка" v-else>

  </app-page>
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
      loading.value = false
    })


    return {
      loading,
      currency,
    }
  },
  components: {AppPage, AppLoader}
}
</script>

<style scoped>

</style>
