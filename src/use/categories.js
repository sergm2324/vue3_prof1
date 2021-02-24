import {useStore} from 'vuex'

export async function useCategories() {
  const store = useStore()

  if (store.getters['categories/getCategories'].length === 0) {
    await store.dispatch('categories/loadAllCategories')
  }
}
