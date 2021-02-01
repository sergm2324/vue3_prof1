<template>
  <app-loader v-if="loading" />
  <app-page title="Shop" v-else>
  </app-page>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
import AppPage from '../components/ui/AppPage'
import AppLoader from '../components/ui/AppLoader'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)


    return {
      loading
    }
  },
  components: {
    AppPage, AppLoader
  }
}
</script>
