<template>
  <app-loader v-if="loading" />
  <div class="card" v-else>
    Список категорий
  </div>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import {ref, computed, onMounted, reactive} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '@/components/ui/AppLoader'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      await store.dispatch('categories/loadAllCategories')
      loading.value = false
    })

    const categories = computed(() => store.getters['categories/getCategories'])

    return {
      loading,
      categories,
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
