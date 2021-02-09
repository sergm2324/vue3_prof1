<template>
  <TheAdminNavbar />
  <the-sidebar />
  <div class="container with-nav">
    <app-message />
    <router-view />
  </div>
</template>

<script>
import TheAdminNavbar from '@/components/TheAdminNavbar'
import TheSidebar from '../components/TheSidebar'
import AppMessage from '../components/ui/AppMessage'

export default {
  components: {TheSidebar, TheAdminNavbar, AppMessage}
}
</script>

<style scoped>

</style>
