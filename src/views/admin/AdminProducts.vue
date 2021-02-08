<template>
  <app-loader v-if="loading" />
  <div class="card" v-else>
      Список инвентаря
  </div>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import {ref, computed, onMounted, reactive} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import AppLoader from '@/components/ui/AppLoader'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)
    const router = useRouter()

    onMounted(async () => {
      loading.value = true
      await store.dispatch('products/loadAllProducts')
      loading.value = false
    })

    return {
      loading,
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
