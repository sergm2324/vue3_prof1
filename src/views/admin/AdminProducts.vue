<template>
  <app-loader v-if="loading" />
  <app-page title="Инвентарь" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Изображение</th>
        <th>Цена</th>
        <th>Категория</th>
        <th>Количество</th>
        <th>Действие</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, idx) in products" :key="product.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ product.title }}</td>
        <td><img :src="product.img" width="30"></td>
        <td>{{ currency(product.price) }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.count }}</td>
        <td><button class="btn">Открыть</button></td>
      </tr>
      </tbody>
    </table>
    <teleport to="body">
      <app-modal v-if="modal" title="Добавить инвентарь" @close="modal = false">
        <product-modal @created="modal = false" />
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import {currency} from '@/utils/currency'
import {ref, computed, onMounted, reactive} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '@/components/ui/AppLoader'
import AppModal from '@/components/ui/AppModal'
import ProductModal from '@/components/request/ProductModal'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)
    const modal = ref(false)

    onMounted(async () => {
      loading.value = true
      await store.dispatch('products/loadAllProducts')
      loading.value = false
    })

    const products = computed(() => store.getters['products/getProducts'])

    return {
      loading,
      products,
      currency,
      modal
    }
  },
  components: {AppPage, AppLoader, AppModal, ProductModal}
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>
