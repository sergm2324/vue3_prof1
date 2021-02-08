<template>
  <TheAdminNavbar />
  <the-sidebar />
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import TheAdminNavbar from '@/components/TheAdminNavbar'
import TheSidebar from '../components/TheSidebar'

export default {
  components: {TheSidebar, TheAdminNavbar}
}
</script>

<style scoped>

</style>
