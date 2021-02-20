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
    <app-pagination v-model="page" :count="allProducts.length" :size="PAGE_SIZE" />

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
import {ref, computed, onMounted, reactive, watch} from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
import AppLoader from '@/components/ui/AppLoader'
import AppModal from '@/components/ui/AppModal'
import ProductModal from '@/components/request/ProductModal'
import AppPagination from '../../components/ui/AppPagination'
import chunk from 'lodash.chunk'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const loading = ref(false)
    const modal = ref(false)
    const page = ref(route.query.page ? +route.query.page : 1)
    const _setPage = () => router.replace({query: {page: page.value}})

    onMounted(_setPage)

    watch(page, _setPage)

    onMounted(async () => {
      loading.value = true
      await store.dispatch('products/loadAllProducts')
      await store.dispatch('categories/loadAllCategories')
      loading.value = false
    })

    const PAGE_SIZE = 5

    const allProducts = computed(() => store.getters['products/getProducts'])
    const products = computed(() => chunk(allProducts.value, PAGE_SIZE)[page.value - 1])

    return {
      loading,
      allProducts,
      products,
      currency,
      modal,
      page,
      PAGE_SIZE
    }
  },
  components: {AppPagination, AppPage, AppLoader, AppModal, ProductModal}
}
</script>

<style scoped>

</style>
