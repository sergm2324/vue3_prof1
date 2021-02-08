<template>
  <app-loader v-if="loading" />
  <app-page title="Категории" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Категория</th>
        <th>Действие</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(cat, idx) in categories" :key="cat.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ cat.title }}</td>
        <td>{{ cat.type }}</td>
        <td><button class="btn">Открыть</button></td>
      </tr>
      </tbody>
    </table>
    <teleport to="body">
      <app-modal v-if="modal" title="Добавить категорию" @close="modal = false">
        <cat-modal @created="modal = false" />
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import {ref, computed, onMounted, reactive} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '@/components/ui/AppLoader'
import AppModal from '@/components/ui/AppModal'
import CatModal from '@/components/request/CatModal'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)
    const modal = ref(false)

    onMounted(async () => {
      loading.value = true
      await store.dispatch('categories/loadAllCategories')
      loading.value = false
    })

    const categories = computed(() => store.getters['categories/getCategories'])

    return {
      loading,
      categories,
      modal
    }
  },
  components: {AppPage, AppLoader, AppModal, CatModal}
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>
